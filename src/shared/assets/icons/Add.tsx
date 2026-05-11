import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};
const Add: React.FC<Props> = ({ width, height, stroke }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 58 58" fill="none">
      <Path
        d="M14.5 29H43.5"
        stroke={stroke}
        strokeWidth="5.4375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M29 43.5V14.5"
        stroke={stroke}
        strokeWidth="5.4375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Add;
