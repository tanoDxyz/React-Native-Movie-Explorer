import React from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
type SpinnerProps = {
  text?: string;
  color?: string;
  spinnerSize?: number | "large" | "small";
  visible: boolean;
  blocking?: boolean;
  overlayStyle?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<ViewStyle>;
};
import colors from "../assets/colors.json"
export const Spinner: React.FC<SpinnerProps> = ({
  visible = false,
  text = "Loading",
  color = colors.globalColors.primary,
  spinnerSize = "small",
  blocking = Platform.OS === "android" ? true : false,
  overlayStyle,
  boxStyle,
}) => {
  if (!visible) {
    return null;
  }

  // For blocking, use Modal so it truly overlays whole screen:
  if (blocking) {
    return (
      <Modal
        visible={true}
        transparent={true}
        animationType="fade"
        // Ensure on iOS the modal overlays everything including status bar:
        presentationStyle="overFullScreen"  // important for iOS
      >
        <View style={[styles.overlay, overlayStyle]}>
          <View style={[styles.dialogBox, boxStyle]}>
            <ActivityIndicator
              color={color}
              size={spinnerSize}
              style={styles.indicator}
            />
            {text ? <Text style={styles.text}>{text}</Text> : null}
          </View>
        </View>
      </Modal>
    );
  }

  // Non-blocking: overlay a view that lets touches pass through
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.overlay, overlayStyle]}>
      <View style={[styles.dialogBox, boxStyle]}>
        <ActivityIndicator
          color={color}
          size={spinnerSize}
          style={styles.indicator}
        />
        {text ? <Text style={styles.text}>{text}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(4, 4, 4, 0.49)",
  },
  dialogBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  indicator: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
