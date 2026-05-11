import { useState } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { Button, Input, Text } from '@/shared/ui';
import { Add, Trash, UserAdmin } from '@/shared/assets/icons';
import { useZonesContext } from '@/context/ZonesContext';
import { getStorage } from '@/utils/storage';
import { useSms } from '@/hook/useSms';
import { formatIranPhoneNumber } from '@/utils/formatIranPhoneNumber';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/context/ToastContext';
import { errorFun } from '@/utils/errorTranslating';

const Admin = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { admin, updateZone } = useZonesContext();
  const { sendSms, loading } = useSms();
  const [modalVisible, setModalVisible] = useState(false);
  const [adminPhone, setAdminPhone] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<{
    phone: string;
    index: number;
  } | null>(null);

  const addAdminHandler = async () => {
    if (admin.length >= 10) {
      showToast('بیشتر از ۱۰ ادمین نمی‌توانید اضافه کنید', 'warning');
      setModalVisible(false);
      setAdminPhone('');
      return;
    }
    try {
      const devicePhoneNumber = await getStorage('devicePhoneNumber');
      const password = await getStorage('password');

      const sms = await sendSms(
        devicePhoneNumber || '',
        `${password} SETADMIN=${admin.length},${formatIranPhoneNumber(
          adminPhone,
        )}`,
        'admin_number_updated.',
        [
          'access_denied',
          'wrong_password!',
          'this_number_is_already_assigned_to_another_admin.',
        ],
      );

      console.log(sms, 'sdfjytytiuiuoppopo');

      if (sms.body === 'admin_number_updated.') {
        updateZone('ADMIN', adminPhone);
        setModalVisible(false);
        setAdminPhone('');
        showToast('ادمین اضافه شد', 'success');
      }
    } catch (e: any) {
      setModalVisible(false);
      setAdminPhone('');
      showToast(errorFun(e), 'error');
    }
  };

  const removeAdminHandler = async (phone: string, index: number) => {
    try {
      const updatedAdmins = admin.filter(item => item !== phone);

      try {
        const devicePhoneNumber = await getStorage('devicePhoneNumber');
        const password = await getStorage('password');

        const sms = await sendSms(
          devicePhoneNumber || '',
          `${password} DELADMIN=${index}`,
          'admin_number_deleted.',
          ['access_denied', 'wrong_password!'],
        );

        if (sms.body === 'admin_number_deleted.') {
          updateZone('REMOVE_ADMIN', JSON.stringify(updatedAdmins));
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const confirmDeleteAdmin = async () => {
    if (!selectedAdmin) return;

    await removeAdminHandler(selectedAdmin.phone, selectedAdmin.index);

    setDeleteModalVisible(false);
    setSelectedAdmin(null);
    showToast('ادمین حذف شد', 'success');
  };

  return (
    <View
      className={
        'bg-white border border-[#EFEFEF] mx-4 mt-6 rounded-lg p-3 flex mb-16'
      }
    >
      <Text
        className={'text-[#020202] text-base text-start'}
        font={'font-yekan-medium'}
      >
        ادمین
      </Text>
      <Text
        className={'text-[#616161] text-sm mt-3 text-justify'}
        font={'font-yekan-medium'}
      >
        در این قسمت امکان افزودن حداکثر ۱۰ شماره تلفن به‌ عنوان ادمین فراهم شده
        است تا شماره های منتخب بتوانند برنامه را مدیریت کنند.
      </Text>
      <View className={'flex justify-center items-center gap-2 my-5'}>
        {admin?.map((item, index) => {
          return (
            <View
              key={index}
              className={
                'flex-row-reverse justify-between items-center w-full bg-[#F5F5F5] px-4 py-3 rounded-xl'
              }
            >
              <View className="flex items-center flex-row-reverse gap-2">
                <UserAdmin width={18} height={18} />
                <Text>{item?.split('+')}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedAdmin({
                    phone: item,
                    index,
                  });

                  setDeleteModalVisible(true);
                }}
                className={'bg-[#FFA6A733] p-1 rounded-lg'}
              >
                <Trash />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      {admin.length >= 10 ? null : (
        <View
          className={
            'flex justify-center items-center gap-3 border-dashed border-2 py-3 rounded-[16px] my-4 border-[#bababa]'
          }
        >
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className={
              'flex justify-center items-center mt-8 bg-[#E8E8E8] rounded-full'
            }
          >
            <Add width={58} height={58} stroke={'#979797'} />
          </TouchableOpacity>
          <Text className="text-[#616161] text-sm" font="font-yekan-medium">
            افزودن ادمین
          </Text>
        </View>
      )}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View className={'flex-1 justify-center items-center bg-black/40 px-6'}>
          <View className={'bg-white w-full rounded-2xl p-5 gap-6'}>
            <View className="flex justify-center items-center">
              <View className="bg-[#8CC8FF33] py-3 w-16 rounded-full flex justify-center items-center">
                <Add width={39} height={37} stroke="#1890FF" />
              </View>
            </View>
            <Input
              label={t(
                'personalInformation.input.devicePhoneNumber.title' as any,
              )}
              placeholder={t(
                'personalInformation.input.devicePhoneNumber.placeHolder' as any,
              )}
              keyboardType="phone-pad"
              maxLength={11}
              value={adminPhone}
              onChangeText={e => {
                setAdminPhone(e);
              }}
            />
            <View className="flex-row gap-3 mt-6">
              <View className="flex-1">
                <Button
                  title="انصراف"
                  variant="outline"
                  size="md"
                  fullWidth
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <View className="flex-1">
                <Button
                  title={loading ? 'در حال ارسال...' : 'افزودن'}
                  size="md"
                  disabled={loading}
                  fullWidth
                  onPress={addAdminHandler}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View className={'flex-1 justify-center items-center bg-black/40 px-6'}>
          <View
            className={
              'bg-white w-full rounded-2xl p-5 flex justify-center items-center gap-6'
            }
          >
            <View className="bg-[#FFA6A733] py-3 w-16 rounded-full flex justify-center items-center">
              <Trash width={39} height={37} />
            </View>
            <Text className={'text-center text-[#616161]'}>
              {`ادمین شماره ${selectedAdmin?.phone?.replace(
                '+',
                '',
              )} حذف خواهد شد`}
            </Text>
            <Text
              className={'text-lg text-center mb-3'}
              font={'font-yekan-medium'}
            >
              آیا مطمئن هستید؟
            </Text>
            <View className="flex-row gap-3 mt-6">
              <View className="flex-1">
                <Button
                  title="انصراف"
                  variant="outline"
                  size="md"
                  fullWidth
                  onPress={() => {
                    setDeleteModalVisible(false);
                    setSelectedAdmin(null);
                  }}
                />
              </View>
              <View className="flex-1">
                <Button
                  title={loading ? 'در حال ارسال...' : 'حذف'}
                  size="md"
                  variant="danger"
                  disabled={loading}
                  fullWidth
                  onPress={confirmDeleteAdmin}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Admin;
