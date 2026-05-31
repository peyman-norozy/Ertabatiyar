import { useThemeMode } from '@/hook/useThemeMode';
import i18n from '@/localization/i18n';
import React, { Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type SetStateCallback<S> = (prevState: S) => S;

interface SelectPickerTypeProps {
  options: { label: string; value: string }[];
  setOption?: Dispatch<SetStateCallback<any[]>>;
  zIndex?: number;
  onValueChange: (value: string) => void;
  selectedValue: string;
  value?: any;
}

const SelectPicker: React.FC<SelectPickerTypeProps> = ({
  options,
  setOption,
  zIndex = 3000,
  onValueChange,
  selectedValue,
}) => {
  const { isDark } = useThemeMode();
  const { t } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const [open, setOpen] = useState(false);

  return (
    <View
      className="mt-2"
      style={{
        zIndex: open ? 9999 : 1,
        overflow: 'visible',
      }}
    >
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={options}
        setOpen={setOpen}
        setValue={callback => {
          const nextValue = callback(selectedValue);

          if (typeof nextValue === 'string') {
            onValueChange(nextValue);
          }
        }}
        setItems={setOption || (() => {})}
        listMode="MODAL"
        rtl={isRtl}
        placeholder={t('general.select')}
        modalAnimationType="slide"
        modalContentContainerStyle={{
          backgroundColor: isDark ? '#171717' : '#F8FAFC',
          paddingTop: 20,
        }}
        arrowIconStyle={{
          tintColor: isDark ? '#F8FAFC' : '#111827',
        }}
        tickIconStyle={{
          tintColor: isDark ? '#F8FAFC' : '#111827',
        }}
        closeIconStyle={{
          tintColor: isDark ? '#F8FAFC' : '#111827',
        }}
        modalTitleStyle={{
          fontSize: 18,
          fontFamily: 'IRANYekanXFaNum-Bold',
          color: isDark ? '#F8FAFC' : '#111827',
          textAlign: 'center',
          marginBottom: 16,
        }}
        listItemContainerStyle={{
          borderRadius: 16,
          marginHorizontal: 12,
          marginVertical: 4,
          backgroundColor: isDark ? '#171717' : '#FFFFFF',
          borderWidth: 1,
          borderColor: isDark ? '#374151' : '#E5E7EB',
          minHeight: 54,
          marginBottom: 25,
        }}
        listItemLabelStyle={{
          fontFamily: 'IRANYekanXFaNum-Regular',
          fontSize: 14,
          color: isDark ? '#F8FAFC' : '#111827',
          textAlign: 'left',
        }}
        selectedItemContainerStyle={{
          backgroundColor: isDark ? '#1E40AF' : '#EFF6FF',
          borderColor: isDark ? '#3B82F6' : '#2563EB',
        }}
        selectedItemLabelStyle={{
          color: isDark ? '#F8FAFC' : '#111827',
          fontFamily: 'IRANYekanXFaNum-Bold',
        }}
        itemSeparator={false}
        searchable
        searchPlaceholder={t('general.search')}
        searchContainerStyle={{
          borderBottomWidth: 0,
          paddingHorizontal: 12,
          marginBottom: 12,
          direction: isRtl ? 'rtl' : 'ltr',
        }}
        searchTextInputStyle={{
          minHeight: 48,
          borderRadius: 14,
          borderColor: isDark ? '#374151' : '#E5E7EB',
          backgroundColor: isDark ? '#171717' : '#FFFFFF',
          textAlign: isRtl ? 'right' : 'left',
          fontFamily: 'IRANYekanXFaNum-Regular',
          color: isDark ? '#F8FAFC' : '#111827',
          direction: isRtl ? 'rtl' : 'ltr',
        }}
        style={{
          minHeight: 56,
          borderRadius: 14,
          borderColor: isDark ? '#374151' : '#D1D5DB',
          backgroundColor: isDark ? '#171717' : '#FFFFFF',
          paddingHorizontal: 16,
        }}
        textStyle={{
          fontSize: 14,
          fontFamily: 'IRANYekanXFaNum-Regular',
          color: isDark ? '#F8FAFC' : '#111827',
        }}
        placeholderStyle={{
          color: isDark ? '#9CA3AF' : '#9CA3AF',
        }}
      />
    </View>
  );
};

export default SelectPicker;
