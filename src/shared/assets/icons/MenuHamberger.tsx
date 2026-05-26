import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};
const MenuHamberger: React.FC<Props> = ({
  width = '24',
  height = '24',
  fill = '#0000',
}) => {
  return (
    <Svg fill={fill} width={width} height={height} viewBox="0 0 52 56">
      <Path d="M50,12.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" />
      <Path d="M50,28H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" />
      <Path d="M50,43.5H2a2,2,0,0,1,0-4H50a2,2,0,0,1,0,4Z" />
    </Svg>
  );
};

export default MenuHamberger;
