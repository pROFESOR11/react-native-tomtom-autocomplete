import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, ScrollView, SafeAreaView, View } from "react-native";
// @ts-ignore
import AutoCompleteInput from "tomtom-autocomplete";

export default function App() {
  const [selected, setselected] = React.useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.selectedItem}>
        <AutoCompleteInput
          inputProps={{
            placeholder: "Search",
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
          // leftElement={<Text style={{ marginRight: 10 }}>left element</Text>}
          // rightElement={<Text>right element</Text>}
          onPress={(item) => setselected(item)}
          tomtomOptions={{ key: "C198lwpRLHCAk7RpTpEEvBwSOla2xE8k" }}
        />
        {selected && (
          <ScrollView
            contentContainerStyle={{ padding: 20, backgroundColor: "#f1f1f1" }}
          >
            <Text>{JSON.stringify(selected, null, 2)}</Text>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  selectedItem: {
    flex: 1,
    marginVertical: 50,
  },
});
