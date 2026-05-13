import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

const Alarm: React.FC<Props> = ({ width, height, stroke }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 21" fill="none">
      <Rect width="22" height="21" rx="10.5" fill="#FFF1CA" />
      <Path
        d="M4.3335 16.6667H17.6668"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 6C7.68667 6 5 8.68667 5 12V16.6667H17V12C17 8.68667 14.3133 6 11 6Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 3.33333V4"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.6665 4.66667L6.33317 5.33333"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.3332 4.66667L15.6665 5.33333"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Alarm;
