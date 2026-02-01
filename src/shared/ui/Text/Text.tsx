import React, { ReactNode } from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';

interface CustomTextProps {
  className?: string;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
  font?: string;
}

export default function Text({
  className = '',
  style,
  children,
  font = 'font-yekan',
}: CustomTextProps) {
  return (
    <RNText className={`${font} ${className}`.trim()} style={style}>
      {children}
    </RNText>
  );
}
