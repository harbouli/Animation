import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('window');
const SIZE = width * 0.6;

const WelcomeScreens = ({title, i, translateX}) => {
  const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
  const rStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      borderRadius,
      transform: [{scale}],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [200, 0, -200],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: () => {
      console.log('tap');
    },
    OnEnd: () => {},
  });
  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(34,124,227,0.${i + 5})`},
      ]}>
      <TapGestureHandler onGestureEvent={tapGestureEvent}>
        <Animated.View style={[styles.square, rStyles]} />
      </TapGestureHandler>
      <Animated.View style={[{position: 'absolute'}, rTextStyle]}>
        <Text style={[styles.text]}>{title}</Text>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreens;

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: '#227CE3',
  },
  text: {
    fontSize: 48,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
