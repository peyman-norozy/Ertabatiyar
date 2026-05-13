import i18n from '@/localization/i18n';
import React, { Dispatch, useEffect, useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type SetStateCallback<S> = (prevState: S) => S;

interface SelectPickerTypeProps {
  options: { label: string; value: string }[];
  setOption?: Dispatch<SetStateCallback<any[]>>; // اختیاری کردم
  zIndex?: number;
  onValueChange: (value: string) => void;
  selectedValue: string;
  value?: any; // این رو میشه حذف کرد یا اختیاری گذاشت
}

const SelectPicker: React.FC<SelectPickerTypeProps> = ({
  options,
  setOption,
  zIndex = 3000,
  onValueChange,
  selectedValue,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(selectedValue || null);
  const isRtl = i18n.dir() === 'rtl';

  // وقتی selectedValue از بیرون تغییر می‌کنه، value داخلی رو به‌روز کن
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  // وقتی value داخلی تغییر می‌کنه، به بیرون اطلاع بده
  useEffect(() => {
    if (value !== null && value !== selectedValue) {
      onValueChange(value);
    }
  }, [value]);

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
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setOption || (() => {})} // اگر setOption وجود نداشت، تابع خالی
        listMode="MODAL"
        rtl={isRtl}
        placeholder="انتخاب کنید..."
        // ===== مودال =====
        modalTitle="انتخاب زمان"
        modalAnimationType="slide"
        modalContentContainerStyle={{
          backgroundColor: '#F8FAFC',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingTop: 20,
        }}
        modalTitleStyle={{
          fontSize: 18,
          fontFamily: 'IRANYekanXFaNum-Bold',
          color: '#111827',
          textAlign: 'center',
          marginBottom: 16,
        }}
        // ===== استایل آیتم‌ها =====
        listItemContainerStyle={{
          borderRadius: 16,
          marginHorizontal: 12,
          marginVertical: 4,
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E5E7EB',
          minHeight: 54,
        }}
        listItemLabelStyle={{
          fontFamily: 'IRANYekanXFaNum-Regular',
          fontSize: 14,
          color: '#111827',
          textAlign: 'left',
        }}
        selectedItemContainerStyle={{
          backgroundColor: '#EFF6FF',
          borderColor: '#2563EB',
        }}
        selectedItemLabelStyle={{
          color: '#2563EB',
          fontFamily: 'IRANYekanXFaNum-Bold',
        }}
        itemSeparator={false}
        // ===== سرچ =====
        searchable
        searchPlaceholder="جستجو..."
        searchContainerStyle={{
          borderBottomWidth: 0,
          paddingHorizontal: 12,
          marginBottom: 12,
        }}
        searchTextInputStyle={{
          minHeight: 48,
          borderRadius: 14,
          borderColor: '#E5E7EB',
          backgroundColor: '#FFFFFF',
          textAlign: 'left',
          fontFamily: 'IRANYekanXFaNum-Regular',
        }}
        // ===== input اصلی =====
        style={{
          minHeight: 56,
          borderRadius: 14,
          borderColor: '#D1D5DB',
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 16,
        }}
        textStyle={{
          fontSize: 14,
          fontFamily: 'IRANYekanXFaNum-Regular',
          textAlign: 'right',
          color: '#111827',
        }}
        placeholderStyle={{
          color: '#9CA3AF',
          textAlign: 'left',
        }}
      />
    </View>
  );
};

export default SelectPicker;
