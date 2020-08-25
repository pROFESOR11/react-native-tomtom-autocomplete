import renderNode from "./renderNode";
import { StyleSheet, Text } from "react-native";

const renderText = (content: any, defaultProps: any, style: any) =>
  renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
  });

export default renderText;
