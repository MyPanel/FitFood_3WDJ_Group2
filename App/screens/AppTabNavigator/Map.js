import React from 'react';
import { Text, View, Image } from 'react-native';
import { Container, Header, Body, Right, Left, Icon } from 'native-base';
import MapView, { Marker } from 'react-native-maps';


class Map extends React.Component {

  render() {
    <Container style={style.container} >
      {/* 지도 */}
      <Header style={{ backgroundColor: "white" }}>
        <Left>
          <Icon name='md-arrow-back' style={{ color: 'black', paddingLeft: 10 }} onPress={() => {
            this.props.navigation.navigate('Setting');
          }}></Icon>
        </Left>
        <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 17, color: "black", fontWeight: 'bold' }}>
            Map</Text>
        </Body>
        <Right>
        </Right>
      </Header>
      <View style={{ backgroundColor: "#f4f6fc" }}>
        <View>
          <MapView
            initialRegion={{
              latitude: 35.89346514,
              longitude: 128.6220269,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={style.mapStyle}>
            <Marker
              coordinate={{
                latitude: 35.89346514, longitude: 128.6220269
              }}
              title="뚝불"
              description="북구 321-12"
            />
          </MapView>
          <View style={{ flexDirection: "row", borderRadius: 30, backgroundColor: "white" }}>
            <View style={{ justifyContent: 'center', marginBottom: 20 }} >
              <View style={{ padding: 15 }}>
                <Image
                  source={require("../../assets/image1.jpg")}
                  style={{ height: 100, width: 100, borderRadius: 20 }}
                />
              </View>

            </View>
            <View style={{ paddingTop: 30 }} >
              <Text style={{ fontSize: 17, fontWeight: 'bold' }}>뚝불(가게이름)</Text>
              <Text style={{ fontSize: 13, color: 'grey', paddingTop: 10 }}>북구 321-12(주소)</Text>
            </View>
          </View>
        </View>
      </View>
    </Container >
  }
}

export default Map;