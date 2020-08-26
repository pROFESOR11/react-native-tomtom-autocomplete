import React from "react";
import { StyleSheet, Dimensions, Text, View } from "react-native";
import { Layout } from "../components/Layout";
import MapView, { Marker, Callout } from "react-native-maps";
// @ts-ignore
import AutoCompleteInput from "react-native-tomtom-autocomplete";

interface WithMapProps {}

export const WithMap: React.FC<WithMapProps> = ({}) => {
  const mapRef = React.useRef<MapView>(null);
  const [selected, setselected] = React.useState(null);
  return (
    <Layout>
      <AutoCompleteInput
        inputProps={{
          placeholder: "Search",
          autoCorrect: false,
          autoCapitalize: "none",
        }}
        onPress={(item) => {
          setselected(item);
          mapRef.current.animateToRegion({
            latitude: item.position.lat,
            longitude: item.position.lon,
            latitudeDelta: 5,
            longitudeDelta: 5,
          });
        }}
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
      <MapView ref={mapRef} style={styles.mapStyle}>
        {selected && (
          <Marker
            coordinate={{
              latitude: selected.position.lat,
              longitude: selected.position.lon,
            }}
          >
            <Callout>
              <Text>{selected.poi || selected.address.freeformAddress}</Text>
            </Callout>
          </Marker>
        )}
      </MapView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    flex: 1,
  },
});
