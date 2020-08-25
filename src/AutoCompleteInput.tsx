import React from "react";
import {
  TextInput,
  View,
  StyleProp,
  ViewStyle,
  TextInputProps,
  Text,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from "react-native";
import useDebounce from "./useDebounce";
import { getPlacesFromTomTom } from "./tomtomHelpers";
import { TomTomPOISearchResponseResult } from "./types";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface AutoCompleteInputProps {
  apiKey: string;
  containerStyle?: StyleProp<ViewStyle>;
  itemsContainerStyle?: StyleProp<ViewStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  onItemPress?: (item: any) => void;
  inputProps?: TextInputProps;
  renderTitle?: (item: any) => React.ReactNode;
  titleProps?: TextInputProps;
  title?: String;
  subtitleProps?: TextInputProps;
  subtitle: string;
  renderSubtitle?: (item: any) => React.ReactNode;
  delay?: number;
}

const defaultContainerStyle = {
  padding: 20,
  width: "100%",
};

const defaultInputProps = {
  placeholder: "Search",
};

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  containerStyle,
  inputProps,
  itemsContainerStyle,
  itemContainerStyle,
  renderTitle,
  title,
  titleProps,
  renderSubtitle,
  onItemPress,
  subtitle,
  subtitleProps,
  delay = 300,
}) => {
  const [searchQuery, setsearchQuery] = React.useState("");
  const searchRef = React.useRef<TextInput>(null);
  const [searchResults, setsearchReults] = React.useState<
    TomTomPOISearchResponseResult[]
  >([]);

  const debouncedSearchQuery = useDebounce(searchQuery, delay);

  function renderEach(item: TomTomPOISearchResponseResult) {
    return (
      <TouchableHighlight
        style={{ ...(itemContainerStyle as object) }}
        onPress={() => {
          setsearchQuery(
            item.poi ? item.poi.name : item.address.freeformAddress
          );
          searchRef.current?.blur();
          if (typeof onItemPress === "function") {
            onItemPress(item);
          }
        }}
      >
        <>
          <View>
            {renderTitle ? (
              renderTitle(item)
            ) : (
              <Text {...(titleProps as object)}>
                {item.poi ? item.poi.name : item.address.freeformAddress}
              </Text>
            )}
          </View>
          <View>{renderSubtitle ? renderSubtitle(item) : undefined}</View>
        </>
      </TouchableHighlight>
    );
  }

  React.useEffect(() => {
    (async function () {
      const results = await getPlacesFromTomTom(debouncedSearchQuery);
      if (results) setsearchReults(results);
    })();
  }, [debouncedSearchQuery]);

  return (
    <React.Fragment>
      <View style={{ ...defaultContainerStyle, ...(containerStyle as object) }}>
        <TextInput
          {...defaultInputProps}
          {...inputProps}
          value={searchQuery}
          ref={searchRef}
          onChangeText={(text) => {
            setsearchQuery(text);
            if (typeof inputProps?.onChangeText === "function") {
              inputProps.onChangeText(text);
            }
          }}
        />
      </View>
      {searchRef.current?.isFocused() && searchResults.length > 0 && (
        <View
          style={{
            width: screenWidth * 0.95,
            height: screenHeight * 0.25,
            ...(itemsContainerStyle as object),
          }}
        >
          <FlatList
            data={searchResults}
            renderItem={({ item }) => renderEach(item)}
          />
        </View>
      )}
    </React.Fragment>
  );
};
