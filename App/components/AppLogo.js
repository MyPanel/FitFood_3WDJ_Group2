import React from "react";
import { Image } from "react-native-elements";

const AppLogo = () => (
  <Image
    source={require("../assets/fitfoodlogo2.png")}
    style={{ width: 460, height: 180 }}
  />
);

export default AppLogo;