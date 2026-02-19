import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  I18nManager,
  View,
} from 'react-native';
import { cn } from '@/utils/cn.ts';

type Variant = 'primary' | 'outline' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  fullWidth,
  leftIcon,
  rightIcon,
}) => {
  const isRTL = I18nManager.isRTL;

  const base =
    'rounded-lg flex-row items-center justify-center active:opacity-80';
  const width = fullWidth ? 'w-full' : 'self-start';

  const variants = {
    primary: 'bg-blue-800',
    outline: 'border border-blue-600 bg-transparent',
    danger: 'bg-red-600',
    ghost: 'bg-transparent',
  };

  const textVariants = {
    primary: 'text-stone-200',
    outline: 'text-blue-600',
    danger: 'text-white',
    ghost: 'text-blue-600',
  };

  const sizes = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        width,
        disabled && 'opacity-50',
      )}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#2563eb' : '#fff'} />
      ) : (
        <View className="flex-row items-center">
          {!isRTL && leftIcon && <View className="mr-2">{leftIcon}</View>}
          <Text
            className={cn(
              'font-yekan-semibold',
              textVariants[variant],
              textSizes[size],
            )}
          >
            {title}
          </Text>
          {isRTL && rightIcon && <View className="ml-2">{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
};

export default Button;
