import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import WelcomeScreens from './src/components/WelcomeScreens';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const WORDS = ["What's", 'Up', 'Here', 'Iam', 'Find'];

const App = () => {
  const translateX = useSharedValue(0);
  const scrolleHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
    // console.log(event.contentOffset.x);
  });
  return (
    // <GestureHandlerRootView>
    <View style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrolleHandler}
        pagingEnabled
        horizontal>
        {WORDS.map((title, i) => {
          return (
            <WelcomeScreens
              key={i.toString()}
              title={title}
              i={i}
              translateX={translateX}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
    // </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
