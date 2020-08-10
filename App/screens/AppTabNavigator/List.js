import React from 'react';
import { StyleSheet, TextInput, Text, View, ScrollView, Alert, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Container, Content, Icon, Button, Header, Body, Left, Right } from 'native-base'; //
import { keyframes } from 'styled-components';
import CardView from './CardView';
import CardView2 from './CardView2';
import { AppLoading } from 'expo';
import Dialog from 'react-native-dialog';
import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { DialogTitle } from 'react-native-paper/lib/typescript/src/components/Dialog/DialogTitle';
import Map from './Map';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recommand_: [],
            loaded: 0,
            dialogVisible1: false,
            dialogVisible2: false,
            breakfast: null,
            value: null,
            check_breakfast: true,
            lunch: true,
            dinner: true,
            eaten_breakfast: false,
            text: null
        };
        this.setInputState = this.setInputState.bind(this);
    }

    setInputState(event) {
        this.setState({ recommand_: event });
    }

    showAlertYes() {
        this.setState({
            dialogVisible1: true,
        })
    }

    showAlertNo() {
        this.setState({
            dialogVisible2: true
        })
    }

    componentDidMount() {
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

        const { navigation } = this.props;

        navigation.addListener('didFocus', () => {
            formData.append('user_email', firebase.auth().currentUser.email);
            formData.append('date', selected_day);
            fetch(`http://ec2-34-239-220-61.compute-1.amazonaws.com/eaten_data`, {
                method: 'POST',
                body: formData
            }).then(res => res.json()).then(res => {
                if (res.eaten_start_list.length > 0) {
                    this.setState({
                        eaten_breakfast: true
                    })
                }
            });
        })


    }

    request_recommend = () => {
        const formData = new FormData();
        let kind = '';
        if (this.state.dialogVisible1) {
            if (!this.state.check_breakfast) {
                const formData_ = new FormData();
                formData_.append('user_email', firebase.auth().currentUser.email);
                formData_.append('food_name', this.state.breakfast);
                // 아침 추가
                fetch(`http://ec2-34-239-220-61.compute-1.amazonaws.com/app_eaten`, { method: 'POST', body: formData_ })
                    .then((res) => res.text())
                    .then(res => { console.log(res); })
                    .catch((e) => console.log(e));
            }

            // kind 문자열
            if (this.state.lunch) {
                kind = kind + '0,';
            } else {
                kind = kind + '1,';
            }
            if (this.state.dinner) {
                kind = kind + '0';
            } else {
                kind = kind + '1';
            }

            const rowData = [];
            formData.append('kind', kind);
            fetch(`http://34.64.243.44:5000/recommend/1`, { method: 'POST', body: formData })
                .then((res) => res.json())
                .then(res => {
                    res.recommendMeals.map(value => {
                        const array = [];
                        for (let index = 0; index < 2; index++) {
                            if (value[index].store_id == '-1') {
                                array.push(value[index].id);
                            } else {
                                array.push(value[index].store_id);
                            }
                            array.push(value[index].image);
                            array.push(value[index].recommend_name);
                        }
                        rowData.push(array);
                    })
                    this.setState({
                        recommand_: rowData,
                        dialogVisible2: false,
                        loaded: 1,
                        text: res.mealInfo
                    })
                })
                .catch((e) => console.log(e));
        } else {
            if (this.state.check_breakfast) {
                kind = kind + '0,';
            } else {
                kind = kind + '1,';
            }
            if (this.state.lunch) {
                kind = kind + '0,';
            } else {
                kind = kind + '1,';
            }
            if (this.state.dinner) {
                kind = kind + '0';
            } else {
                kind = kind + '1';
            }
            // CardView로 보낼 데이터 배열
            const rowData = [];

            formData.append('kind', kind);
            fetch(`http://34.64.243.44:5000/recommend/1`, { method: 'POST', body: formData })
                .then((res) => res.json())
                .then(res => {
                    res.recommendMeals.map(value => {
                        const array = [];
                        for (let index = 0; index < 3; index++) {
                            if (value[index].store_id == '-1') {
                                array.push(value[index].id);
                            } else {
                                array.push(value[index].store_id);
                            }
                            array.push(value[index].image);
                            array.push(value[index].recommend_name);
                        }
                        rowData.push(array);
                    })
                    this.setState({
                        recommand_: rowData,
                        dialogVisible2: false,
                        loaded: 2,
                        text: res.mealInfo
                    })
                })
                .catch((e) => console.log(e));
        }

    };

    cancel = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // …Your logic
        this.setState({
            dialogVisible1: false,
            dialogVisible2: false
        });
    };

    render() {
        if (this.state.loaded == 0) {
            return (
                <ImageBackground
                    style={style.qcontainer}
                    source={require('./main.jpg')}
                    imageStyle={{ resizeMode: 'cover' }}
                >
                    <Text style={{ fontSize: 30, color: 'black', fontWeight: 'bold', paddingLeft: 20, paddingTop: 200 }} >朝ごはんは食べましたか。</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Button style={style.button}><Text style={style.textO} onPress={this.showAlertYes.bind(this)}>はい</Text></Button>
                        {/* 네 눌렀을 경우 다이얼로그 */}
                        <Dialog.Container visible={this.state.dialogVisible1}>
                            {this.state.eaten_breakfast
                                ? null
                                : <View><Dialog.Title>朝ごはんは何を食べましたか。</Dialog.Title><Dialog.Input onChangeText={(value) => { this.setState({ breakfast: value }) }} ></Dialog.Input></View>
                            }
                            <View style={style.dialog1}>
                                <Text style={{ fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>昼食はどうやって食べますか。</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                lunch: true
                                            })
                                        }}>
                                        {this.state.lunch
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>外食</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                lunch: false
                                            })
                                        }}>
                                        {this.state.lunch
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>直接調理</Text>
                                </View>
                                <Text style={{ fontSize: 15, marginBottom: 5, marginTop: 10, fontWeight: 'bold' }}>夕食はどうやって食べますか。</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                dinner: true
                                            })
                                        }}>
                                        {this.state.dinner
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>外食</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                dinner: false
                                            })
                                        }}>
                                        {this.state.dinner
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>直接調理</Text>
                                </View>
                            </View>
                            <Dialog.Button label="OK" onPress={this.request_recommend} style={{ color: 'black' }} />
                            <Dialog.Button label="Cancel" onPress={this.cancel} style={{ color: 'black' }} />
                        </Dialog.Container>
                        <Button style={style.button}><Text style={style.textX} onPress={this.showAlertNo.bind(this)}>いいえ</Text></Button>
                        <Dialog.Container visible={this.state.dialogVisible2}>
                            <View style={style.dialog2}>
                                <Text style={{ fontSize: 15, marginBottom: 5, marginTop: 10, fontWeight: 'bold' }}>朝ごはんはどうやって食べますか。</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                check_breakfast: true
                                            })
                                        }}>
                                        {this.state.check_breakfast
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>外食</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                check_breakfast: false
                                            })
                                        }}>
                                        {this.state.check_breakfast
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>直接調理</Text>
                                </View>
                                <Text style={{ fontSize: 15, marginBottom: 5, marginTop: 10, fontWeight: 'bold' }}>昼食はどうやって食べますか。</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                lunch: true
                                            })
                                        }}>
                                        {this.state.lunch
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>外食</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                lunch: false
                                            })
                                        }}>
                                        {this.state.lunch
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>直接調理</Text>
                                </View>
                                <Text style={{ fontSize: 15, marginBottom: 5, marginTop: 10, fontWeight: 'bold' }}>夕食はどうやって食べますか。</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                dinner: true
                                            })
                                        }}>
                                        {this.state.dinner
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>外食</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                dinner: false
                                            })
                                        }}>
                                        {this.state.dinner
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>直接調理</Text>
                                </View>
                            </View>
                            <Dialog.Button label="OK" onPress={this.request_recommend} style={{ color: 'black' }} />
                            <Dialog.Button label="Cancel" onPress={this.cancel} style={{ color: 'black' }} />
                        </Dialog.Container>
                    </View>
                </ImageBackground>
            );
        } else if (this.state.loaded == 1) {
            return (
                <View style={style.container}>
                    <Container style={style.container}>
                        {/* <Header style={{ backgroundColor: "#1fa518" }}>
                            <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold' }}>
                                    추천식단
                                </Text>
                            </Body>
                        </Header> */}

                        <Content style={{ backgroundColor: 'white' }}>
                            <View style={{ marginBottom: 20 }}>
                                <View style={{ padding: 30, flexDirection: "row", justifyContent: "space-between" }}>
                                </View>

                                <View style={{ padding: 16, marginBottom: 30, flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ color: "black", fontSize: 30, fontWeight: 'bold' }}>味と栄養まで{"\n"}今日のお勧めの献立</Text>
                                    <Icon name='ios-heart' style={{ fontsize: '30', color: 'orange', paddingRight: 20, paddingTop: 13 }}></Icon>
                                </View>
                                <View style={{
                                    backgroundColor: "#f6f6f6",
                                    marginHorizontal: 8,
                                    marginVertical: 8,
                                    borderRadius: 20,
                                    paddingVertical: 20,
                                    paddingHorizontal: 24,
                                    flexDirection: "row"
                                }}>
                                    <Icon name='ios-checkmark-circle' style={{ fontsize: '25', color: 'orange' }} ></Icon>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontsize: '23', color: "grey", padding: 10 }}>{this.state.text}</Text>
                                        {/* <Text style={{ fontsize: '23', color: "grey", padding: 10 }}>あなたにお勧めの献立</Text> */}
                                    </View>
                                </View>
                                <View style={{ paddingLeft: 25, paddingTop: 25 }}>
                                    <Text style={{ color: "black", fontSize: 16, fontWeight: 'bold' }}>Recommended</Text>
                                </View>
                            </View>
                            {
                                this.state.recommand_.map((value, index) => <CardView data={value} key={index} />)
                            }
                        </Content>
                    </Container>
                </View>
            );
        } else {
            return (
                <View style={style.container}>
                    <Container style={style.container}>
                        {/* <Header style={{ backgroundColor: "#1fa518" }}>
                            <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold' }}>
                                    추천식단
                                </Text>
                            </Body>
                        </Header> */}
                        <Content style={{ backgroundColor: 'white' }}>
                            <View style={{ marginBottom: 20 }}>
                                <View style={{ padding: 30, flexDirection: "row", justifyContent: "space-between" }}>
                                </View>

                                <View style={{ padding: 16, marginBottom: 30, flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ color: "black", fontSize: 30, fontWeight: 'bold' }}>味と栄養まで{"\n"}今日のお勧めの献立</Text>
                                    <Icon name='ios-heart' style={{ fontsize: '30', color: 'orange', paddingRight: 20, paddingTop: 13 }}></Icon>
                                </View>
                                <View style={{
                                    backgroundColor: "#f6f6f6",
                                    marginHorizontal: 8,
                                    marginVertical: 8,
                                    borderRadius: 20,
                                    paddingVertical: 20,
                                    paddingHorizontal: 24,
                                    flexDirection: "row"
                                }}>
                                    <Icon name='ios-checkmark-circle' style={{ fontsize: '25', color: 'orange' }} ></Icon>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontsize: '23', color: "grey", padding: 10 }}>{this.state.text}</Text>
                                        {/* <Text style={{ fontsize: '23', color: "grey", padding: 10 }}>あなたにお勧めの献立</Text> */}
                                    </View>
                                </View>
                                <View style={{ paddingLeft: 25, paddingTop: 25 }}>
                                    <Text style={{ color: "black", fontSize: 16, fontWeight: 'bold' }}>Recommended</Text>
                                </View>
                            </View>
                            {
                                this.state.recommand_.map((value, index) => <CardView2 data={value} key={index} />)
                            }
                        </Content>
                    </Container>
                </View>
            )
        }

    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    qcontainer: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: "#1fa518"
    },
    dialog1: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    dialog2: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    textO: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textX: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        marginLeft: 3,
        marginRight: 3,
        width: 100,
        height: 50,
        backgroundColor: '#ff9f0d',
        justifyContent: 'center',
        borderRadius: 30
    },
    food: {
        marginTop: 20,
        height: 200,
        backgroundColor: '#F57C00'
    }
});

const styles = StyleSheet.create({
    radioText: {
        marginRight: 10,
        marginLeft: 3,
        fontSize: 14,
        color: '#000',
        //fontWeight: '700'
    },
    radioCircle: {
        height: 17,
        width: 17,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#ff9f0d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 7,
        height: 7,
        borderRadius: 50,
        backgroundColor: '#ff9f0d',
    }
});


export default List