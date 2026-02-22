import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

const Signal: React.FC<Props> = ({ width, height, stroke }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12 15.75C13.1046 15.75 14 14.7426 14 13.5C14 12.2574 13.1046 11.25 12 11.25C10.8954 11.25 10 12.2574 10 13.5C10 14.7426 10.8954 15.75 12 15.75Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20 20.25C21.26 18.3713 22 16.0312 22 13.5C22 10.9688 21.26 8.62875 20 6.75"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 6.75C2.74 8.62875 2 10.9688 2 13.5C2 16.0312 2.74 18.3713 4 20.25"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.7998 17.55C17.5498 16.425 17.9998 15.0188 17.9998 13.5C17.9998 11.9813 17.5498 10.575 16.7998 9.45001"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.20001 9.45001C6.45001 10.575 6 11.9813 6 13.5C6 15.0188 6.45001 16.425 7.20001 17.55"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Signal;
