import React from 'react';
import { Button, Dimensions, Platform, StyleSheet, Text, View, Image, ImageBackground, StatusBar } from 'react-native';
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';
import { MarterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import firebase from 'firebase';
import {
    StackedBarChart, PieChart
} from "react-native-chart-kit";
import { ProgressCircle } from 'react-native-svg-charts'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { color } from 'react-native-reanimated';


class HomeTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: null,
            fontsLoaded: false,
            eaten_food: '',
            Carbohydrate: 0,
            Cholesterol: 0,
            Kamium: 0,
            calorie: 0,
            fat: 0,
            name: "",
            price: 0,
            protein: 0,
            salt: 0,
            render: true,
            nut: [[], [], [], [], [], []],
            nut_2: [[], [], [], []],
            kcal: [],
            day: {},
            list: null,
            Car_Per: null,
            Pro_Per: null,
            Fat_Per: null,
        }
    };

    async componentDidMount() {
        const { navigation } = this.props;

        navigation.addListener('didFocus', () => {
            this.setState({
                nut: [[], [], [], [], [], []],
                nut_2: [[], [], [], []],
                kcal: [],
                Carbohydrate: 0,
                protein: 0,
                fat: 0
            })
            var year = 2020;

            var date;
            var month;

            if (new Date().getMonth() + 1 < 10)
                month = '0' + (new Date().getMonth() + 1);
            else
                month = new Date().getMonth() + 1;


            if (new Date().getDate() < 10)
                date = '0' + (new Date().getDate());
            else
                date = new Date().getDate();


            const selected_day = '' + year + '-' + month + '-' + date;

            const formData = new FormData();
            formData.append('user_email', firebase.auth().currentUser.email);
            formData.append('date', selected_day);
            fetch(`http://ec2-34-239-220-61.compute-1.amazonaws.com/eaten_data`, {
                method: 'POST',
                body: formData
            }).then(
                res => res.json())
                .then(
                    res => {
                        if (res.nutrients_list.length == 0) {
                            this.setState({
                                count: 0
                            })
                        } else {
                            if (res.user_gender == 'M') {
                                for (let i = 0; i < res.nutrients_list.length; i++) {

                                    if (i == 0) {
                                        this.state.nut[1].push(0);
                                        this.state.nut[3].push(0);
                                        this.state.nut[5].push(0);
                                        this.state.nut[1].push(0);
                                        this.state.nut[3].push(0);
                                        this.state.nut[5].push(0);
                                        this.state.nut[1].push(0);
                                        this.state.nut[3].push(0);
                                        this.state.nut[5].push(0);

                                        this.state.nut[1].push(300);
                                        this.state.nut[3].push(3500);
                                        this.state.nut[5].push(1500);

                                        this.state.nut_2[2].push(0);
                                        this.state.nut_2[2].push(0);
                                        this.state.nut_2[2].push(0);
                                        this.state.nut_2[2].push(65);
                                    }

                                    this.state.nut[0].push(res.nutrients_list[i][0].nutrient_cholesterol);
                                    this.state.nut[2].push(res.nutrients_list[i][0].nutrient_kamium);
                                    this.state.nut[4].push(res.nutrients_list[i][0].nutrient_salt);

                                    this.state.nut_2[0].push(res.nutrients_list[i][0].nutrient_carbohydrate);
                                    this.state.nut_2[1].push(res.nutrients_list[i][0].nutrient_protein);
                                    this.state.nut_2[3].push(res.nutrients_list[i][0].nutrient_fat);

                                    this.state.kcal.push(res.nutrients_list[i][0].nutrient_carbohydrate * 4);
                                    this.state.Carbohydrate += res.nutrients_list[i][0].nutrient_carbohydrate;
                                    this.state.kcal.push(res.nutrients_list[i][0].nutrient_fat * 9);
                                    this.state.fat += res.nutrients_list[i][0].nutrient_fat
                                    this.state.kcal.push(res.nutrients_list[i][0].nutrient_protein * 4);
                                    this.state.protein += res.nutrients_list[i][0].nutrient_protein
                                }
                            } else {
                                for (let i = 0; i < res.nutrients_list.length; i++) {

                                    if (i == 0) {
                                        this.state.nut[1].push(300);
                                        this.state.nut[3].push(3500);
                                        this.state.nut[5].push(1500);

                                        this.state.nut_2[2].push(55);
                                    }

                                    this.state.nut[0].push(res.nutrients_list[i][0].nutrient_cholesterol);
                                    this.state.nut[2].push(res.nutrients_list[i][0].nutrient_kamium);
                                    this.state.nut[4].push(res.nutrients_list[i][0].nutrient_salt);

                                    this.state.nut_2[0].push(res.nutrients_list[i][0].nutrient_carbohydrate);
                                    this.state.nut_2[1].push(res.nutrients_list[i][0].nutrient_protein);
                                    this.state.nut_2[3].push(res.nutrients_list[i][0].nutrient_fat);

                                    this.state.kcal.push(res.nutrients_list[i][0].nutrient_carbohydrate * 4);
                                    this.state.kcal.push(res.nutrients_list[i][0].nutrient_fat * 9);
                                    this.state.kcal.push(res.nutrients_list[i][0].nutrient_protein * 4);
                                }

                            }
                            let car = Math.round((this.state.Carbohydrate / (this.state.Carbohydrate + this.state.protein + this.state.fat)) * 100);
                            let pro = Math.round((this.state.protein / (this.state.Carbohydrate + this.state.protein + this.state.fat)) * 100);
                            let fat = Math.round((this.state.fat / (this.state.Carbohydrate + this.state.protein + this.state.fat)) * 100);


                            this.setState({
                                count: res.nutrients_list.length,
                                Car_Per: car,
                                Pro_Per: pro,
                                Fat_Per: fat
                            });
                        }
                    })
                .catch(error => console.error(error));
        });
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (<Icon name='ios-home' style={{ color: tintColor }}></Icon>),
    };

    render() {
        if (this.state.count == 0) {
            return (
                <ImageBackground
                    style={styles.maincontainer}
                    source={require('./main.jpg')}
                    imageStyle={{ resizeMode: 'cover' }}
                >
                    <Text style={{ marginTop: 180, marginLeft: 55, fontSize: 23, color: 'black', fontWeight: 'bold' }}>
                        写真を撮って健康的な食事を{"\n"}              始めましょう!
                    </Text>
                </ImageBackground>
            );

        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "#ff9f0d"
                    }}
                >
                    <StatusBar barStyle="light-content" style={{ backgroundColor: "#ff9f0d" }} />
                    <View style={{ backgroundColor: "#ff9f0d" }}>
                        <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
                            <Icon name='md-heart' style={{ color: 'white', paddingLeft: 10 }} onPress={() => {
                                this.props.navigation.navigate('Calendar');
                            }}></Icon>
                            <View style={{ flexDirection: "row" }}>
                                <Icon name='ios-settings' style={{ color: 'white', paddingRight: 10 }} onPress={() => {
                                    this.props.navigation.navigate('Setting');
                                }}></Icon>
                            </View>
                        </View>

                        <View style={{ padding: 16, marginBottom: 60 }}>
                            <Text style={{ color: "white", fontSize: 30, fontWeight: 'bold' }}>{"tester, \n当日の摂取栄養素を \n確認しましょう！"}</Text>
                        </View>
                    </View>
                    <ScrollView style={{ backgroundColor: '#f4f6fc' }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "white",
                                marginTop: 30,
                                // marginLeft: 5,
                                // marginRight: 5,
                                marginHorizontal: 16,
                                marginVertical: 4,
                                borderRadius: 20,
                                paddingVertical: 20,
                                paddingHorizontal: 24
                            }}>
                            <Text style={{ marginLeft: 13, marginTop: 20, fontWeight: "bold", fontSize: 20, color: "black", marginBottom: 20 }}>
                                3大栄養素比率比較グラフ
                            </Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                                <View style={{ width: 20, height: 20, backgroundColor: "#fcd8ac" }}>
                                </View>
                                <Text style={{ fontSize: 13, color: "#fcd8ac", marginLeft: 2 }}>
                                    {this.state.Car_Per}</Text>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 2 }}>
                                    %</Text>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 2, fontWeight: 'bold' }}>
                                    /</Text>
                                {this.state.Car_Per > 50
                                    ? <Text style={{ fontSize: 13, color: "red", marginRight: 5 }}>50%</Text>
                                    : <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>50%</Text>
                                }
                                <View style={{ width: 20, height: 20, backgroundColor: "#fcacac" }}>
                                </View>
                                <Text style={{ fontSize: 13, color: "#fcacac", marginLeft: 2 }}>
                                    {this.state.Pro_Per}</Text>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 2 }}>
                                    %</Text>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 2, fontWeight: 'bold' }}>
                                    /</Text>
                                {this.state.Pro_Per > 30
                                    ? <Text style={{ fontSize: 13, color: "red", marginRight: 5 }}>30%</Text>
                                    : <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>30%</Text>
                                }
                                <View style={{ width: 20, height: 20, backgroundColor: "#dfacfc" }}>
                                </View>
                                <Text style={{ fontSize: 13, color: "#dfacfc", marginLeft: 2 }}>
                                    {this.state.Fat_Per}</Text>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 2 }}>
                                    %</Text>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 2, fontWeight: 'bold' }}>
                                    /</Text>
                                {this.state.Fat_Per > 20
                                    ? <Text style={{ fontSize: 13, color: "red", marginRight: 5 }}>20%</Text>
                                    : <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>20%</Text>
                                }
                            </View>
                            <PieChart
                                data={[
                                    {
                                        name: 'g 糖質',
                                        ratio: Math.round(this.state.Carbohydrate),
                                        color: '#fcd8ac',
                                        legendFontColor: '#7F7F7F',
                                        legendFontSize: 15,
                                    },
                                    {
                                        name: 'g タンパク質',
                                        ratio: Math.round(this.state.protein),
                                        color: '#fcacac',
                                        legendFontColor: '#7F7F7F',
                                        legendFontSize: 15,
                                    },
                                    {
                                        name: 'g 脂質',
                                        ratio: Math.round(this.state.fat),
                                        color: '#dfacfc',
                                        legendFontColor: '#7F7F7F',
                                        legendFontSize: 15,
                                    }
                                ]}
                                width={Dimensions.get('window').width - 50}
                                height={220}
                                chartConfig={{
                                    backgroundColor: '#1cc910',
                                    backgroundGradientFrom: '#eff3ff',
                                    backgroundGradientTo: '#efefef',
                                    decimalPlaces: 2,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                                accessor="ratio"
                                backgroundColor="transparent"
                                paddingLeft="15"
                                absolute //for the absolute number remove if you want percentage
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "white",
                                marginTop: 40,
                                //marginLeft: 5,
                                //marginRight: 5,
                                marginBottom: 5,
                                marginHorizontal: 8,
                                marginVertical: 4,
                                borderRadius: 20,
                                paddingVertical: 20,
                                paddingHorizontal: 24
                            }}>
                            <Text style={{ marginLeft: 13, marginTop: 20, fontWeight: "bold", fontSize: 20, color: "black", marginBottom: 20 }}>
                                その他の栄養素比較グラフ(mg)
                            </Text>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 20, height: 20, backgroundColor: "#fcf9ac" }}>
                                </View>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                                    朝ご飯</Text>
                                <View style={{ width: 20, height: 20, backgroundColor: "#c3fcac" }}>
                                </View>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                                    昼食</Text>
                                <View style={{ width: 20, height: 20, backgroundColor: "#acfcfb" }}>
                                </View>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                                    夕食</Text>
                            </View>
                            <StackedBarChart
                                data={{
                                    labels: [
                                        'chol',
                                        '勧奨',
                                        'potass',
                                        '勧奨',
                                        'sodium',
                                        '勧奨'
                                    ],
                                    data: this.state.nut,
                                    barColors: ['#fcf9ac', '#c3fcac', '#acfcfb', '#ff9f0d'],
                                    //legend: ['아침', '점심', '저녁'],
                                }}
                                width={Dimensions.get('window').width - 16}
                                height={200}
                                chartConfig={{
                                    backgroundColor: 'white',
                                    backgroundGradientFrom: 'white',
                                    backgroundGradientTo: 'white',
                                    decimalPlaces: 2,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                style={{
                                    alignItems: 'center'
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "white",
                                marginTop: 40,
                                //marginLeft: 5,
                                // marginRight: 5,
                                marginBottom: 20,
                                marginHorizontal: 16,
                                marginVertical: 4,
                                borderRadius: 20,
                                paddingVertical: 20,
                                paddingHorizontal: 24
                            }}>
                            <Text style={{ marginLeft: 13, marginTop: 20, fontWeight: "bold", fontSize: 20, color: "black", marginBottom: 10 }}>
                                カロリー
                        </Text>
                            <ProgressCircle
                                style={{ height: 200 }}
                                progress={this.state.kcal.reduce((a, b) => a + b, 0) / 2400}
                                progressColor={'#ff7141'}
                                startAngle={-Math.PI * 0.8}
                                endAngle={Math.PI * 0.8}
                            />
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", textAlign: 'center', color: '#ff7141', fontSize: 16 }}>{Math.round(this.state.kcal.reduce((a, b) => a + b, 0))}</Text>
                                <Text style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", textAlign: 'center', fontSize: 16 }}>  /  2000kcal</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                // <Container style={styles.container}>
                //     <Header style={{ backgroundColor: "white" }}>
                //         <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                //             <Text style={{ textAlign: 'center', fontSize: 17, color: "black", fontWeight: 'bold' }}>
                //                 당일 섭취 영양소</Text>
                //         </Body>
                //     </Header>
                //     <ScrollView style={{ backgroundColor: "#ecf0f1" }}>
                //         <View style={{ flex: 1, backgroundColor: "white", marginTop: 30, marginLeft: 5, marginRight: 5 }}>
                //             <Text style={{ marginLeft: 13, marginTop: 20, fontWeight: "bold", fontSize: 20, color: "black", marginBottom: 20 }}>
                //                 탄단지 비율 비교 그래프
                //             </Text>
                //             <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                //                 <View style={{ width: 20, height: 20, backgroundColor: "#FF6E6E" }}>
                //                 </View>
                //                 <Text style={{ fontSize: 13, color: "#FF6E6E", marginLeft: 2 }}>
                //                     {this.state.Car_Per}</Text>
                //                 <Text style={{ fontSize: 13, color: "black", marginRight: 2 }}>
                //                     %</Text>
                //                 <Text style={{ fontSize: 13, color: "black", marginRight: 2, fontWeight: 'bold' }}>
                //                     /</Text>
                //                 {this.state.Car_Per > 50
                //                     ? <Text style={{ fontSize: 13, color: "red", marginRight: 5 }}>50%</Text>
                //                     : <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>50%</Text>
                //                 }
                //                 <View style={{ width: 20, height: 20, backgroundColor: "#0A6EFF" }}>
                //                 </View>
                //                 <Text style={{ fontSize: 13, color: "#0A6EFF", marginLeft: 2 }}>
                //                     {this.state.Pro_Per}</Text>
                //                 <Text style={{ fontSize: 13, color: "black", marginRight: 2 }}>
                //                     %</Text>
                //                 <Text style={{ fontSize: 13, color: "black", marginRight: 2, fontWeight: 'bold' }}>
                //                     /</Text>
                //                 {this.state.Pro_Per > 30
                //                     ? <Text style={{ fontSize: 13, color: "red", marginRight: 5 }}>30%</Text>
                //                     : <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>30%</Text>
                //                 }
                //                 <View style={{ width: 20, height: 20, backgroundColor: "#c56cf0" }}>
                //                 </View>
                //                 <Text style={{ fontSize: 13, color: "#c56cf0", marginLeft: 2 }}>
                //                     {this.state.Fat_Per}</Text>
                //                 <Text style={{ fontSize: 13, color: "black", marginRight: 2 }}>
                //                     %</Text>
                //                 <Text style={{ fontSize: 13, color: "black", marginRight: 2, fontWeight: 'bold' }}>
                //                     /</Text>
                //                 {this.state.Fat_Per > 20
                //                     ? <Text style={{ fontSize: 13, color: "red", marginRight: 5 }}>20%</Text>
                //                     : <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>20%</Text>
                //                 }
                //             </View>
                //             <PieChart
                //                 data={[
                //                     {
                //                         name: 'g 탄수화물',
                //                         ratio: Math.round(this.state.Carbohydrate),
                //                         color: '#FF6E6E',
                //                         legendFontColor: '#7F7F7F',
                //                         legendFontSize: 15,
                //                     },
                //                     {
                //                         name: 'g 단백질',
                //                         ratio: Math.round(this.state.protein),
                //                         color: '#0A6EFF',
                //                         legendFontColor: '#7F7F7F',
                //                         legendFontSize: 15,
                //                     },
                //                     {
                //                         name: 'g 지방',
                //                         ratio: Math.round(this.state.fat),
                //                         color: '#c56cf0',
                //                         legendFontColor: '#7F7F7F',
                //                         legendFontSize: 15,
                //                     }
                //                 ]}
                //                 width={Dimensions.get('window').width - 16}
                //                 height={220}
                //                 chartConfig={{
                //                     backgroundColor: '#1cc910',
                //                     backgroundGradientFrom: '#eff3ff',
                //                     backgroundGradientTo: '#efefef',
                //                     decimalPlaces: 2,
                //                     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                //                     style: {
                //                         borderRadius: 16,
                //                     },
                //                 }}
                //                 style={{
                //                     marginVertical: 8,
                //                     borderRadius: 16,
                //                 }}
                //                 accessor="ratio"
                //                 backgroundColor="transparent"
                //                 paddingLeft="15"
                //                 absolute //for the absolute number remove if you want percentage
                //             />
                //         </View>
                //         <View style={{ flex: 1, backgroundColor: "white", marginTop: 40, marginLeft: 5, marginRight: 5, marginBottom: 5 }}>
                //             <Text style={{ marginLeft: 13, marginTop: 20, fontWeight: "bold", fontSize: 20, color: "black", marginBottom: 20 }}>
                //                 기타 영양소 비교 그래프(mg)
                //             </Text>
                //             <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                //                 <View style={{ width: 20, height: 20, backgroundColor: "#FA5858" }}>
                //                 </View>
                //                 <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                //                     아침</Text>
                //                 <View style={{ width: 20, height: 20, backgroundColor: "#FFE146" }}>
                //                 </View>
                //                 <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                //                     점심</Text>
                //                 <View style={{ width: 20, height: 20, backgroundColor: "#6DD66D" }}>
                //                 </View>
                //                 <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                //                     저녁</Text>
                //             </View>
                //             <StackedBarChart
                //                 data={{
                //                     labels: [
                //                         '콜레스테롤',
                //                         '권장',
                //                         '칼륨',
                //                         '권장',
                //                         '염분',
                //                         '권장'
                //                     ],
                //                     data: this.state.nut,
                //                     barColors: ['#FA5858', '#FFE146', '#6DD66D', '#a6ada8'],
                //                 }}
                //                 width={Dimensions.get('window').width + 130}
                //                 height={220}
                //                 chartConfig={{
                //                     backgroundColor: 'white',
                //                     backgroundGradientFrom: 'white',
                //                     backgroundGradientTo: 'white',
                //                     decimalPlaces: 2,
                //                     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                //                     style: {
                //                         borderRadius: 16,
                //                     },
                //                 }}
                //                 style={{
                //                     marginVertical: 8,
                //                     borderRadius: 30
                //                 }}
                //             />
                //         </View>
                //         <View style={{ flex: 1, backgroundColor: "white", marginTop: 40, marginLeft: 5, marginRight: 5, marginBottom: 5 }}>
                //             <Text style={{ marginLeft: 13, marginTop: 20, fontWeight: "bold", fontSize: 20, color: "black", marginBottom: 10 }}>
                //                 칼로리
                //         </Text>
                //             <ProgressCircle
                //                 style={{ height: 200 }}
                //                 progress={this.state.kcal.reduce((a, b) => a + b, 0) / 2400}
                //                 progressColor={'#2E2EFE'}
                //                 startAngle={-Math.PI * 0.8}
                //                 endAngle={Math.PI * 0.8}
                //             />
                //             <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                //                 <Text style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", textAlign: 'center', color: '#2E2EFE', fontSize: 16 }}>{Math.round(this.state.kcal.reduce((a, b) => a + b, 0))}</Text>
                //                 <Text style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", textAlign: 'center', fontSize: 16 }}>  /  2000kcal</Text>
                //             </View>
                //         </View>
                //     </ScrollView>
                // </Container>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    maincontainer: {
        flex: 1,
        //backgroundColor: '#1fa518',
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    chartContainer: {
        height: 400,
        borderColor: "#000",
        borderWidth: 1
    }
})

export default HomeTab;
