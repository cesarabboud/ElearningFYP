import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import { IconButton, Portal, Provider } from "react-native-paper";

const BottomSheet = ({ show, onDismiss, enableBackdropDismiss, children }) => {
  const bottomSheetHeight = Dimensions.get("window").height * 0.58;
  const deviceWidth = Dimensions.get("window").width;
  const [open, setOpen] = useState(show);
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;

  const onGesture = (event) => {
    if (event.nativeEvent.translationY > 0) {
      bottom.setValue(-event.nativeEvent.translationY);
    }
  };

  const onGestureEnd = (event) => {
    if (event.nativeEvent.translationY > bottomSheetHeight / 2) {
      onDismiss();
    } else {
      bottom.setValue(0);
    }
  };

  useEffect(() => {
    if (show) {
      setOpen(show);
      Animated.timing(bottom, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
      });
    }
  }, [show]);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <GestureHandlerRootView style={styles.container}>
        <Pressable
          onPress={enableBackdropDismiss ? onDismiss : undefined}
          style={styles.backDrop}
        />
        <Animated.View
          style={[
            styles.root,
            {
              height: bottomSheetHeight,
              bottom: bottom,
              shadowOffset: {
                height: -3,
              },
            },
            styles.common,
          ]}
        >
          <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
            <View
              style={[
                styles.header,
                styles.common,
                {
                  justifyContent:'center',
                  alignItems:'center'
                },
                {
                  position: "relative",
                  shadowOffset: {
                    height: 3,
                  },
                },
              ]}
            >
              <View
                style={{
                  width: 60,
                  height: 5,
                  borderRadius: 3,
                  position: "absolute",
                  top: 8,
                  left: (deviceWidth - 60) / 2,
                  zIndex: 10,
                  backgroundColor: "#ccc",
                }}
              />
              <IconButton
                color="red"
                icon="close"
                style={styles.closeIcon}
                onPress={onDismiss}
              />
              <Text style={{marginTop:5,fontWeight:"600",fontSize:20}}>Answers</Text>
            </View>
          </PanGestureHandler>
          {children}
        </Animated.View>
      </GestureHandlerRootView>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  header: {
    height: 50,
    backgroundColor: "#fff",
  },
  common: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 3,
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    top: 3,
    zIndex: 10,
  },
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 80,
    backgroundColor: "rgba(217,217,217, 0.2)",
  },
});
export default BottomSheet;