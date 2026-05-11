import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};
const BlueEdit: React.FC<Props> = ({ width, height, stroke }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M16.5 3H13.5C6 3 3 6 3 13.5V22.5C3 30 6 33 13.5 33H22.5C30 33 33 30 33 22.5V19.5"
        stroke={stroke}
        strokeWidth="3.375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.0598 4.53L12.2398 16.35C11.7898 16.8 11.3398 17.685 11.2498 18.33L10.6048 22.845C10.3648 24.48 11.5198 25.62 13.1548 25.395L17.6698 24.75C18.2998 24.66 19.1848 24.21 19.6498 23.76L31.4698 11.94C33.5098 9.9 34.4698 7.53 31.4698 4.53C28.4698 1.53 26.0998 2.49 24.0598 4.53Z"
        stroke={stroke}
        strokeWidth="3.375"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.3652 6.22501C23.3702 9.81001 26.1752 12.615 29.7752 13.635"
        stroke={stroke}
        strokeWidth="3.375"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default BlueEdit;
