import renderNode from "./renderNode";
import { StyleSheet, Text, StyleProp, TextStyle } from "react-native";

const renderText = (
  content: any,
  defaultProps: any,
  style: StyleProp<TextStyle>
) =>
  renderNode(Text, content, {
    ...(defaultProps as object),
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
  });

export default renderText;
