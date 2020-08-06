import React from "react";
import { Button } from "react-native-elements";

const FormButton = ({ title, buttonType, buttonColor, backgroundColor, ...rest }) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{ borderColor: buttonColor, borderRadius: 20, backgroundColor: '#ff9f0d' }}
    titleStyle={{ color: buttonColor }}
  />
);

export default FormButton;
