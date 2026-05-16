import i18n from '@/localization/i18n';
import React, { Dispatch, useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const isRtl = i18n.dir() === 'rtl';

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
        placeholder="انتخاب کنید..."
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
