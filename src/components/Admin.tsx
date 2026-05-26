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
import { useThemeMode } from '@/hook/useThemeMode';

const Admin = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { admin, updateZone } = useZonesContext();
  const { sendSms, loading } = useSms();

  const { isDark } = useThemeMode();
  const [modalVisible, setModalVisible] = useState(false);
  const [adminPhone, setAdminPhone] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<{
    phone: string;
    index: number;
  } | null>(null);

  const addAdminHandler = async () => {
    if (admin.length >= 10) {
      showToast(t('general.messages.adminLimit'), 'warning');
      setModalVisible(false);
      setAdminPhone('');
      return;
    }

    try {
      const devicePhoneNumber = await getStorage('devicePhoneNumber');
      const password = await getStorage('password');

      const sms = await sendSms(
        devicePhoneNumber ?? '',
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

      if (sms.body === 'admin_number_updated.') {
        updateZone('ADMIN', adminPhone);
        showToast(t('general.adminAdded'), 'success');
      }

      setModalVisible(false);
      setAdminPhone('');
    } catch (e: any) {
      setModalVisible(false);
      setAdminPhone('');
      showToast(errorFun(e), 'error');
    }
  };

  const removeAdminHandler = async (phone: string, index: number) => {
    try {
      const devicePhoneNumber = await getStorage('devicePhoneNumber');
      const password = await getStorage('password');

      const sms = await sendSms(
        devicePhoneNumber ?? '',
        `${password} DELADMIN=${index}`,
        'admin_number_deleted.',
        ['access_denied', 'wrong_password!'],
      );

      if (sms.body === 'admin_number_deleted.') {
        const updated = admin.filter(item => item !== phone);
        updateZone('REMOVE_ADMIN', JSON.stringify(updated));
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
    showToast(t('general.messages.adminDeleted'), 'success');
  };

  return (
    <View
      className="
        mx-4 mt-6 p-4 rounded-xl
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-700
        mb-16
      "
    >
      <Text className="text-base text-black dark:text-white font-medium">
        {t('general.admins')}
      </Text>

      <Text className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
        {t('general.messages.massageAdmin')}
      </Text>
      <View className="gap-3 my-5">
        {admin?.map((item, index) => (
          <View
            key={index}
            className="
              flex-row-reverse justify-between items-center
              bg-neutral-100 dark:bg-neutral-800
              border border-neutral-200 dark:border-neutral-700
              px-4 py-3 rounded-xl
            "
          >
            <View className="flex-row-reverse items-center gap-2">
              <UserAdmin
                width={18}
                height={18}
                stroke={isDark ? '#E5E7EB' : '#4B5563'}
              />
              <Text className="text-black dark:text-white">
                {item?.replace('+', '')}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setSelectedAdmin({ phone: item, index });
                setDeleteModalVisible(true);
              }}
              className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg"
            >
              <Trash />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Add Button */}
      {admin.length < 10 && (
        <View className="items-center justify-center gap-3 border-2 border-dashed border-neutral-300 dark:border-neutral-600 py-4 rounded-xl">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            className="bg-neutral-200 dark:bg-neutral-700 rounded-full p-3"
          >
            <Add width={58} height={58} stroke="#9CA3AF" />
          </TouchableOpacity>

          <Text className="text-sm text-neutral-500 dark:text-neutral-400">
            {t('general.addAdmin')}
          </Text>
        </View>
      )}
      <Modal
        visible={modalVisible}
        backdropColor="#000000a3"
        animationType="fade"
      >
        <View className="flex-1 justify-center items-center px-6">
          <View className="bg-white dark:bg-neutral-900 w-full rounded-2xl p-5 gap-6">
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
              onChangeText={setAdminPhone}
            />
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button
                  title={t('general.cancel')}
                  variant="outline"
                  fullWidth
                  onPress={() => setModalVisible(false)}
                />
              </View>

              <View className="flex-1">
                <Button
                  title={loading ? t('general.sending') : t('general.add')}
                  disabled={loading || adminPhone.length !== 11}
                  fullWidth
                  onPress={addAdminHandler}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={deleteModalVisible}
        backdropColor="#000000b3"
        animationType="fade"
      >
        <View className="flex-1 justify-center items-center px-6">
          <View className="bg-white dark:bg-neutral-900 w-full rounded-2xl p-5 gap-6 items-center">
            <Trash width={40} height={40} />
            <Text className="text-center text-neutral-500 dark:text-neutral-400">
              {`${t('general.adminNumber')} ${selectedAdmin?.phone?.replace(
                '+',
                '',
              )} ${t('general.willBeDeleted')}`}
            </Text>
            <Text className="text-lg text-center text-black dark:text-white">
              {t('general.areYouSure')}
            </Text>
            <View className="flex-row gap-3 w-full">
              <View className="flex-1">
                <Button
                  title={t('general.cancel')}
                  variant="outline"
                  fullWidth
                  onPress={() => {
                    setDeleteModalVisible(false);
                    setSelectedAdmin(null);
                  }}
                />
              </View>
              <View className="flex-1">
                <Button
                  title={loading ? t('general.sending') : t('general.delete')}
                  variant="danger"
                  fullWidth
                  disabled={loading}
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
