import React, { ReactNode } from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

interface CustomTextProps {
  className?: string;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
}

export default function Text({
  className = '',
  style,
  children,
}: CustomTextProps) {
  return (
    <RNText className={`font-yekan ${className}`} style={style}>
      {children}
    </RNText>
  );
}
