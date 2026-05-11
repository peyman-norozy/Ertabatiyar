import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  I18nManager,
  View,
  TouchableOpacity,
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
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  flipIconOnRTL?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  fullWidth,
  icon,
  iconPosition = 'start',
  flipIconOnRTL = false,
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

  const shouldRenderIconBeforeText =
    (iconPosition === 'start' && !isRTL) || (iconPosition === 'end' && isRTL);

  const shouldFlip = flipIconOnRTL && isRTL;

  return (
    <TouchableOpacity
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
          {icon && shouldRenderIconBeforeText && (
            <View className={cn('mr-2', shouldFlip && 'rotate-180')}>
              {icon}
            </View>
          )}

          <Text
            className={cn(
              'font-yekan-semibold',
              textVariants[variant],
              textSizes[size],
            )}
          >
            {title}
          </Text>

          {icon && !shouldRenderIconBeforeText && (
            <View className={cn('ml-2', !shouldFlip && 'rotate-180')}>
              {icon}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
