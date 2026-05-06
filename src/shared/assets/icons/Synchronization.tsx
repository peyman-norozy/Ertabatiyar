import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};
const Synchronization: React.FC<Props> = ({ width, height, stroke }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      //   xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M16.945 14.3356V17.8623C16.945 20.8077 15.7694 21.9832 12.8241 21.9832H9.31035C6.37793 21.9832 5.18945 20.8077 5.18945 17.8623V14.3356C5.18945 11.4032 6.36501 10.2277 9.31035 10.2277H12.837C15.7694 10.2277 16.945 11.4032 16.945 14.3356Z"
        stroke={stroke}
        stroke-width="1.33636"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21.9831 9.29756V12.8242C21.9831 15.7696 20.8075 16.9451 17.8622 16.9451H16.945V14.3356C16.945 11.4032 15.7694 10.2277 12.8241 10.2277H10.2275V9.29756C10.2275 6.35221 11.4031 5.18958 14.3484 5.18958H17.8751C20.8075 5.18958 21.9831 6.36513 21.9831 9.29756Z"
        stroke={stroke}
        stroke-width="1.33636"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M26.5042 17.4618C26.5042 22.4611 22.4608 26.5045 17.4614 26.5045L18.8178 24.2438"
        stroke={stroke}
        stroke-width="1.33636"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M0.667969 9.71088C0.667969 4.71154 4.71136 0.668152 9.71069 0.668152L8.35429 2.92883"
        stroke={stroke}
        stroke-width="1.33636"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Synchronization;
