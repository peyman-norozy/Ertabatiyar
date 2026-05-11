import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

const BlueAdd: React.FC<Props> = ({ width, height, stroke }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 38 38"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.5 19H28.5"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19 28.5V9.5"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BlueAdd;
