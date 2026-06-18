import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

type Props = PressableProps & { style?: StyleProp<ViewStyle> };

export function PressableScale({ style, ...props }: Props) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [style, { opacity: pressed ? 0.72 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
    />
  );
}
