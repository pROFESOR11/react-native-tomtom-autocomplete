import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
// @ts-ignore
import AutoCompleteInput from "react-native-tomtom-autocomplete";
import { Layout } from "../components/Layout";

interface BasicProps {}

export const Basic: React.FC<BasicProps> = ({}) => {
  const [selected, setselected] = React.useState(null);
  return (
    <Layout>
      <AutoCompleteInput
        inputProps={{
          placeholder: "Search",
          autoCorrect: false,
          autoCapitalize: "none",
        }}
        onPress={(item) => setselected(item)}
        inputContainerStyle={{
          padding: 10,
          margin: 10,
          borderWidth: 2,
          borderColor: "grey",
        }}
        listItemsContainerStyle={{
          padding: 10,
          marginHorizontal: 10,
          borderWidth: 2,
          borderColor: "grey",
        }}
        bottomDivider
        tomtomOptions={{
          key: "C198lwpRLHCAk7RpTpEEvBwSOla2xE8k",
        }}
      />

      {selected && (
        <ScrollView
          contentContainerStyle={{ padding: 20, backgroundColor: "#f1f1f1" }}
        >
          <Text>{JSON.stringify(selected, null, 2)}</Text>
        </ScrollView>
      )}
    </Layout>
  );
};
