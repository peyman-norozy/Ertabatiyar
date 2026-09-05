import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import { Text } from '@/shared/ui';
import { Eye, EyeSlash } from '@/shared/assets/icons';

interface InputProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
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
  value?: string;
  onChangeText?: (text: string) => void;
  onlyDigits?: boolean;
  type?: 'text' | 'password';
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
  keyboardType = 'default',
  value,
  onChangeText,
  onlyDigits,
  type = 'text',
  ...rest
}) => {
  const [secure, setSecure] = useState(type === 'password');
  const isRTL = I18nManager.isRTL;

  const handleChange = (text: string) => {
    if (onlyDigits) {
      const cleaned = text.replace(/[^0-9]/g, '');
      onChangeText?.(cleaned);
      return;
    }

    onChangeText?.(text);
  };

  const togglePassword = () => {
    setSecure(prev => !prev);
  };

  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text
          className={`text-gray-700 dark:text-gray-50 text-sm mb-1 font-yekan-medium ${labelClassName}`}
        >
          {label}
        </Text>
      )}

      <View
        className={`
          flex-row items-center bg-white dark:bg-neutral-700 dark:border-neutral-800 border rounded-lg
          ${error ? 'border-red-500' : 'border-stone-400 dark:border-stone-800'}
          ${disabled ? 'bg-gray-100 dark:bg-neutral-700' : ''}
        `}
      >
        {leftIcon && <View className="pl-3">{leftIcon}</View>}

        <TextInput
          className={`
            flex-1 px-4 py-3 text-sm text-gray-900 dark:text-gray-200 ${
              isRTL ? 'font-yekan' : 'font-yekan-xvf'
            }
            ${leftIcon ? '' : 'pl-4'}
            ${rightIcon || type === 'password' ? 'pr-2' : 'pr-4'}
            ${inputClassName}
          `}
          keyboardType={keyboardType}
          value={value}
          onChangeText={handleChange}
          editable={!disabled}
          secureTextEntry={secure}
          textAlign={isRTL ? 'right' : 'left'}
          placeholderTextColor="#9ca3af"
          placeholder={placeholder}
          {...rest}
        />

        {type === 'password' ? (
          <TouchableOpacity onPress={togglePassword} className="pr-3">
            {secure ? (
              <Eye width={24} height={24} />
            ) : (
              <EyeSlash width={24} height={24} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
              className="pr-3"
            >
              {rightIcon}
            </TouchableOpacity>
          )
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
