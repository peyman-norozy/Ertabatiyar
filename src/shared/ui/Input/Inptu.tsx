import React from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
} from 'react-native';

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
}) => {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text
          className={`text-gray-700 text-base mb-1 font-medium ${labelClassName}`}
        >
          {label}
        </Text>
      )}

      <View
        className={`
          flex-row items-center bg-gray-50 border rounded-lg
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100' : ''}
        `}
      >
        {leftIcon && <View className="pl-3">{leftIcon}</View>}

        <TextInput
          className={`
            flex-1 px-4 py-3 text-base text-gray-900
            ${leftIcon ? '' : 'pl-4'}
            ${rightIcon || onRightIconPress ? 'pr-2' : 'pr-4'}
            ${inputClassName}
          `}
          placeholderTextColor="#9ca3af"
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
        <Text className={`text-red-500 text-sm mt-1 ${errorClassName}`}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;
