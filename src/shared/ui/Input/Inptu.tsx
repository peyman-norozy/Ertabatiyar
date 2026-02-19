import React from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@/shared/ui';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  leftIcon,
  rightIcon,
  onRightIconPress,
  disabled = false,
  placeholder = '',
}) => {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text
          className={`text-gray-700 text-sm mb-1 font-yekan-medium ${labelClassName}`}
        >
          {label}
        </Text>
      )}

      <View
        className={`
          flex-row items-center bg-white border rounded-lg
          ${error ? 'border-red-500' : 'border-stone-400'}
          ${disabled ? 'bg-gray-100' : ''}
        `}
      >
        {leftIcon && <View className="pl-3">{leftIcon}</View>}

        <TextInput
          className={`
            flex-1 px-4 py-3 text-base text-gray-900 font-yekan
            ${leftIcon ? '' : 'pl-4'}
            ${rightIcon || onRightIconPress ? 'pr-2' : 'pr-4'}
            ${inputClassName}
          `}
          placeholderTextColor="#9ca3af"
          placeholder={placeholder}
        />

        {(rightIcon || onRightIconPress) && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            className="pr-3"
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text
          className={`text-red-500 text-sm mt-1 font-yekan ${errorClassName}`}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;
