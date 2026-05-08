import { useState } from 'react';
import { View, Modal, TouchableOpacity, Alert } from 'react-native';
import { Input, Text } from '@/shared/ui';
import { Add } from '@/shared/assets/icons';
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
    if (admin.length >= 5) {
      Alert.alert('خطا', 'بیشتر از ۵ ادمین نمی‌توانید اضافه کنید');
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
        className={'text-[#616161] text-sm mt-3'}
        font={'font-yekan-medium'}
      >
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
      </Text>
      <Text
        className={'text-[#616161] text-sm mt-2'}
        font={'font-yekan-medium'}
      >
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
      </Text>
      <View className={'flex justify-center items-center gap-2 mt-5'}>
        {admin?.map((item, index) => {
          return (
            <View
              key={index}
              className={
                'flex-row-reverse justify-between items-center w-full bg-[#F5F5F5] px-4 py-3 rounded-xl'
              }
            >
              <Text>{item}</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedAdmin({
                    phone: item,
                    index,
                  });

                  setDeleteModalVisible(true);
                }}
                className={'bg-red-500 px-3 py-1 rounded-lg'}
              >
                <Text className={'text-white text-xs'}>حذف</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* ADD BUTTON */}
      <View className={'flex justify-center items-center'}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className={
            'flex justify-center items-center mt-8 bg-[#E8E8E8] rounded-full'
          }
        >
          <Add width={58} height={58} />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View className={'flex-1 justify-center items-center bg-black/40 px-6'}>
          <View className={'bg-white w-full rounded-2xl p-5'}>
            <Text
              className={'text-lg mb-4 text-center'}
              font={'font-yekan-medium'}
            >
              افزودن ادمین
            </Text>

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

            <TouchableOpacity
              onPress={addAdminHandler}
              disabled={loading}
              className={
                'bg-black rounded-xl py-3 mt-5 justify-center items-center'
              }
            >
              <Text className={'text-white'}>
                {loading ? 'در حال ارسال...' : 'ثبت'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className={'mt-3 justify-center items-center'}
            >
              <Text className={'text-red-500'}>بستن</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View className={'flex-1 justify-center items-center bg-black/40 px-6'}>
          <View className={'bg-white w-full rounded-2xl p-5'}>
            <Text
              className={'text-lg text-center mb-3'}
              font={'font-yekan-medium'}
            >
              حذف ادمین
            </Text>

            <Text className={'text-center text-[#616161]'}>
              آیا از حذف این ادمین مطمئن هستید؟
            </Text>

            <Text className={'text-center mt-2'}>{selectedAdmin?.phone}</Text>

            <View className={'flex-row-reverse gap-3 mt-6'}>
              <TouchableOpacity
                onPress={confirmDeleteAdmin}
                disabled={loading}
                className={
                  'flex-1 bg-red-500 rounded-xl py-3 justify-center items-center'
                }
              >
                <Text className={'text-white'}>
                  {loading ? 'در حال ارسال...' : 'حذف'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setDeleteModalVisible(false);
                  setSelectedAdmin(null);
                }}
                disabled={loading}
                className={
                  'flex-1 bg-[#E8E8E8] rounded-xl py-3 justify-center items-center'
                }
              >
                <Text>انصراف</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Admin;
