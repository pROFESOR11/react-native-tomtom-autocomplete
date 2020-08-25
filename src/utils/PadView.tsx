// @ts-nocheck
import React from "react";
import { View } from "react-native";

export default class PadView extends React.Component {
  constructor(props) {
    super(props);
    this._root = React.createRef();
  }

  setNativeProps = (nativeProps) => {
    this._root.current.setNativeProps(nativeProps);
  };

  render() {
    const { children, pad, Component, ...props } = this.props;
    const childrens = React.Children.toArray(children);
    const { length } = childrens;
    const Container = Component || View;
    return (
      <Container {...props} ref={this._root}>
        <>
          {React.Children.map(
            childrens,
            (child, index) =>
              child && [child, index !== length - 1 && <View width={pad} />]
          )}
        </>
      </Container>
    );
  }
}
