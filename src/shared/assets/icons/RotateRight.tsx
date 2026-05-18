import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};
const RotateRight: React.FC<Props> = ({
  width,
  height,
  stroke = '#1890FF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
      <Path
        d="M9.92664 3.38667C9.34664 3.21334 8.70664 3.10001 7.99997 3.10001C4.80664 3.10001 2.21997 5.68667 2.21997 8.88001C2.21997 12.08 4.80664 14.6667 7.99997 14.6667C11.1933 14.6667 13.78 12.08 13.78 8.88667C13.78 7.70001 13.42 6.59334 12.8066 5.67334"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.7533 3.54668L8.82666 1.33334"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.7533 3.54666L8.50665 5.18666"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default RotateRight;
