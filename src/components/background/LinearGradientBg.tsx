import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Defs, Rect, LinearGradient, Stop} from 'react-native-svg';

const LinearGradientBg = ({
  flex,
  children,
  from_color,
  to_color,
}: {
  children: React.ReactNode;
  flex: number;
  from_color: string;
  to_color: string;
}) => {
  return (
    <View style={{flex}}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor={from_color} />
            <Stop offset="1" stopColor={to_color} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      {children}
    </View>
  );
};

export default LinearGradientBg;
