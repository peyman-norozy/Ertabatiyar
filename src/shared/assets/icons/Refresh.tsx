import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};
const Refresh: React.FC<Props> = ({ width, height, stroke }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M3.11 16.44V21.44V16.44Z" fill="#FDFDFD" />
      <Path
        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 21.44V16.44H7.63M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M17.56 7.56H22V2.56"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Refresh;
