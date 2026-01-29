// ui/CustomHeader.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuIcon } from '@/shared/assets/icons';
import {
  CustomHeaderPropsType,
  NavigationProp,
} from '@/shared/ui/header/model';
import { Text } from '@/shared/ui';

const CustomHeader: React.FC<CustomHeaderPropsType> = ({
  title,
  showBackButton = false,
  showMenuButton = false,
}) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex-row-reverse items-center bg-gray-100 p-4 shadow-md">
      {showMenuButton && (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          className="mx-2"
        >
          <MenuIcon
            width={30}
            height={30}
            fill={false ? '#ff0000' : '#aaaaaa'}
          />
        </TouchableOpacity>
      )}
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} className="mx-2">
          {/*<Icon name="arrow-back" size={24} color="#000" />*/}
        </TouchableOpacity>
      )}
      <Text className="flex-1 text-center text-lg font-bold">{title}</Text>
    </View>
  );
};

export default CustomHeader;
