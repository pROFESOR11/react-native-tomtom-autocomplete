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
  ViewProps,
  StyleSheet,
  Platform,
  GestureResponderEvent,
} from "react-native";
import PadView from "./utils/Padview";
import useDebounce from "./utils/useDebounce";
import { TomTomPOISearchResponseResult, TomTomOptions } from "./utils/types";
import renderNode from "./utils/renderNode";
import renderText from "./utils/renderText";
import { getPlacesFromTomTom } from "./utils/tomtomHelpers";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface AutoCompleteInputProps extends ListItemProps {
  tomtomOptions: TomTomOptions;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputProps?: TextInputProps;
  listItemsContainerStyle?: StyleProp<ViewStyle>;
  titleExtractor?: (item: TomTomPOISearchResponseResult) => string;
  subtitleExtractor?: (item: TomTomPOISearchResponseResult) => string;
  delay?: number;
}

export interface ListItemProps {
  item: TomTomPOISearchResponseResult;
  title: string | React.ReactNode;
  titleStyle: StyleProp<Text>;
  titleProps: ViewProps;
  subtitle: string | React.ReactNode;
  subtitleStyle: StyleProp<Text>;
  subtitleProps: ViewProps;
  containerStyle: ViewProps;
  onPress: (
    item: TomTomPOISearchResponseResult,
    event: GestureResponderEvent
  ) => void;
  onLongPress: (
    item: TomTomPOISearchResponseResult,
    event: GestureResponderEvent
  ) => void;
  leftElement: React.ReactNode;
  rightElement: React.ReactNode;
  contentContainerStyle: ViewProps;
  disabled: boolean;
  disabledStyle: ViewProps;
  bottomDivider: boolean;
  topDivider: boolean;
  [key: string]: any;
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  tomtomOptions,
  inputContainerStyle,
  inputProps,
  listItemsContainerStyle,
  titleExtractor,
  subtitleExtractor,
  delay = 300,
  ...listItemProps
}) => {
  const [searchQuery, setsearchQuery] = React.useState("");
  const searchRef = React.useRef<TextInput>(null);
  const [searchResults, setsearchReults] = React.useState<
    TomTomPOISearchResponseResult[]
  >([]);

  const debouncedSearchQuery = useDebounce(searchQuery, delay);

  function renderListItem({
    item,
    title,
    titleStyle,
    titleProps,
    subtitle,
    subtitleStyle,
    subtitleProps,
    containerStyle,
    onPress,
    onLongPress,
    leftElement,
    rightElement,
    contentContainerStyle,
    disabled = false,
    disabledStyle,
    bottomDivider,
    topDivider,
    ...rest
  }: ListItemProps) {
    return (
      <TouchableHighlight
        {...rest}
        onPress={(event) => {
          setsearchQuery(
            item.poi ? item.poi.name : item.address.freeformAddress
          );
          searchRef?.current?.blur();
          if (typeof onPress === "function") onPress(item, event);
        }}
        onLongPress={(event) => onLongPress(item, event)}
        disabled={disabled}
      >
        <PadView
          // @ts-ignore
          Component={View}
          style={StyleSheet.flatten([
            styles.container,
            topDivider && { borderTopWidth: StyleSheet.hairlineWidth },
            bottomDivider && { borderBottomWidth: StyleSheet.hairlineWidth },
            containerStyle,
            disabled && disabledStyle,
          ])}
        >
          {renderNode(Text, leftElement)}
          {(typeof title !== "undefined" || subtitle) && (
            <View
              style={StyleSheet.flatten([
                styles.contentContainer,
                contentContainerStyle,
              ])}
            >
              {renderText(
                title,
                { testID: "listItemTitle", ...titleProps },
                StyleSheet.flatten([styles.title, titleStyle])
              )}
              {renderText(
                subtitle,
                subtitleProps,
                StyleSheet.flatten([styles.subtitle, subtitleStyle])
              )}
            </View>
          )}
          {renderNode(Text, rightElement)}
        </PadView>
      </TouchableHighlight>
    );
  }

  React.useEffect(() => {
    (async function () {
      const results = await getPlacesFromTomTom(
        debouncedSearchQuery,
        tomtomOptions
      );
      if (results) setsearchReults(results);
    })();
  }, [debouncedSearchQuery]);

  return (
    <React.Fragment>
      <View style={{ ...(inputContainerStyle as object) }}>
        <TextInput
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
            ...(listItemsContainerStyle as object),
          }}
        >
          <FlatList
            data={searchResults}
            renderItem={({ item }) =>
              renderListItem({
                ...listItemProps,
                item,
                title:
                  typeof titleExtractor === "function"
                    ? titleExtractor(item)
                    : item.address.freeformAddress,
                subtitle:
                  typeof subtitleExtractor === "function"
                    ? subtitleExtractor(item)
                    : item.type,
              })
            }
          />
        </View>
      )}
    </React.Fragment>
  );
};

const styles = {
  container: {
    ...Platform.select({
      ios: {
        padding: 14,
      },
      default: {
        padding: 16,
      },
    }),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "grey",
  },
  title: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      default: {
        fontSize: 16,
      },
    }),
  },
  subtitle: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        fontSize: 15,
      },
      default: {
        color: "rgba(0, 0, 0, 0.54)",
        fontSize: 14,
      },
    }),
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center" as const,
  },
  rightContentContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  inputContainer: {
    flex: 1,
    paddingRight: 0,
  },
  inputContentContainer: {
    flex: 1,
    borderBottomWidth: 0,
    width: null,
    height: null,
  },
  input: {
    flex: 1,
    textAlign: "right",
    width: null,
    height: null,
  },
  checkboxContainer: {
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    padding: 0,
  },
  buttonGroupContainer: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  rightTitle: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  rightSubtitle: {
    color: "rgba(0, 0, 0, 0.54)",
  },
};
