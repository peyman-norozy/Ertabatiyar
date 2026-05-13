import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

const Buzzer: React.FC<Props> = ({ width, height, stroke }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 21" fill="none">
      <Rect
        width="22"
        height="21"
        rx="10.5"
        fill="#DDF3D1"
        fill-opacity="0.4"
      />
      <Path
        d="M3 9V12C3 13.5 3.75 14.25 5.25 14.25H6.3225C6.6 14.25 6.8775 14.3325 7.1175 14.475L9.3075 15.8475C11.1975 17.0325 12.75 16.17 12.75 13.9425V7.0575C12.75 4.8225 11.1975 3.9675 9.3075 5.1525L7.1175 6.525C6.8775 6.6675 6.6 6.75 6.3225 6.75H5.25C3.75 6.75 3 7.5 3 9Z"
        stroke={stroke}
        stroke-width="1.5"
      />
      <Path
        d="M15 7.5C16.335 9.2775 16.335 11.7225 15 13.5"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.3726 5.625C18.5401 8.5125 18.5401 12.4875 16.3726 15.375"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Buzzer;
