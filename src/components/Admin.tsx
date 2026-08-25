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
import Refresh from '@/shared/assets/icons/Refresh';

type AdminItem = {
  index: number;
  phone: string;
};

const time = 5000;

const Admin = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { admin, updateZone } = useZonesContext();
  const { sendSms, loading } = useSms();
  const { isDark } = useThemeMode();

  const [modalVisible, setModalVisible] = useState(false);
  const [adminPhone, setAdminPhone] = useState('');

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState<AdminItem | null>(null);

  // مشخص می‌کند که ADMINLIST حداقل یک بار از دستگاه گرفته شده یا نه
  const [adminListLoaded, setAdminListLoaded] = useState(false);

  const [admins, setAdmins] = useState<AdminItem[]>([]);

  /**
   * پاسخ ADMINLIST را parse می‌کند.
   *
   * ورودی:
   *
   * admin_numbers:
   * 0: +989362718986
   * 3: +989105343598
   */
  const parseAdminList = (body: string): AdminItem[] => {
    const result: AdminItem[] = [];

    const adminSectionMatch = body.match(/admin_numbers:\s*([\s\S]*)/i);

    if (!adminSectionMatch?.[1]) {
      return result;
    }

    const adminSection = adminSectionMatch[1];

    const regex = /(\d+)\s*:\s*(\+?\d+)/g;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(adminSection)) !== null) {
      const index = Number(match[1]);
      const phone = match[2];

      result.push({
        index,
        phone,
      });
    }

    return result;
  };

  /**
   * گرفتن لیست ادمین‌ها از دستگاه
   */
  const getAdminListHandler = async () => {
    try {
      const devicePhoneNumber = await getStorage('devicePhoneNumber');
      const password = await getStorage('password');

      const sms = await sendSms(
        devicePhoneNumber ?? '',
        `${password} ADMINLIST`,
        'admin_numbers:',
        ['access_denied', 'wrong_password!', 'SETADMIN'],
      );

      console.log('ADMINLIST response:', sms.body);

      const parsedAdmins = parseAdminList(sms.body);

      console.log('Parsed admins:', parsedAdmins);

      setAdmins(parsedAdmins);
      setAdminListLoaded(true);

      /**
       * اطلاعات را برای بخش‌های دیگر برنامه هم ذخیره می‌کنیم.
       */
      await updateZone(
        'REMOVE_ADMIN',
        JSON.stringify(parsedAdmins.map(item => item.phone)),
      );
    } catch (e: any) {
      console.log('ADMINLIST error:', e);

      if (e === 'SETADMIN') {
        showToast(t('general.messages.accessDenied'), 'error');
      } else {
        showToast(errorFun(e), 'error');
      }
    }
  };

  /**
   * پیدا کردن اولین شماره خالی دستگاه
   *
   * مثلا اگر:
   *
   * 0
   * 3
   *
   * پر باشند، خروجی می‌شود:
   *
   * 1
   */
  const getNextAdminIndex = () => {
    for (let i = 0; i < 10; i++) {
      const exists = admins.some(admin => admin.index === i);

      if (!exists) {
        return i;
      }
    }

    return -1;
  };

  /**
   * اضافه کردن ادمین
   */
  const addAdminHandler = async () => {
    if (!adminPhone || adminPhone.length !== 11) {
      return;
    }

    if (admins.length >= 10) {
      showToast(t('general.messages.adminLimit'), 'warning');
      return;
    }

    const nextIndex = getNextAdminIndex();

    if (nextIndex === -1) {
      showToast(t('general.messages.adminLimit'), 'warning');
      return;
    }

    try {
      const devicePhoneNumber = await getStorage('devicePhoneNumber');
      const password = await getStorage('password');

      const formattedPhone = formatIranPhoneNumber(adminPhone);

      const sms = await sendSms(
        devicePhoneNumber ?? '',
        `${password} SETADMIN=${nextIndex},${formattedPhone}`,
        'admin_number_updated.',
        [
          'access_denied',
          'wrong_password!',
          'this_number_is_already_assigned_to_another_admin.',
          'SETADMIN',
        ],
      );

      console.log('ADD ADMIN response:', sms.body);

      if (sms.body === 'admin_number_updated.') {
        showToast(t('general.adminAdded'), 'success');

        /**
         * بعد از اضافه شدن، دوباره ADMINLIST می‌گیریم
         * تا اطلاعات واقعی دستگاه نمایش داده شود.
         */
        setModalVisible(false);
        setAdminPhone('');

        setTimeout(async () => {
          await getAdminListHandler();
        }, time);
      }
    } catch (e: any) {
      console.log('ADD ADMIN error:', e);

      setModalVisible(false);
      setAdminPhone('');

      showToast(errorFun(e), 'error');
    }
  };

  /**
   * حذف ادمین
   */
  const removeAdminHandler = async (phone: string, deviceIndex: number) => {
    try {
      const devicePhoneNumber = await getStorage('devicePhoneNumber');
      const password = await getStorage('password');

      const sms = await sendSms(
        devicePhoneNumber ?? '',
        `${password} DELADMIN=${deviceIndex}`,
        'admin_number_deleted.',
        ['access_denied', 'wrong_password!', 'SETADMIN'],
      );

      console.log('DELETE ADMIN response:', sms.body);

      if (sms.body === 'admin_number_deleted.') {
        showToast(t('general.messages.adminDeleted'), 'success');

        /**
         * دوباره اطلاعات واقعی دستگاه را می‌گیریم.
         */
        setTimeout(async () => {
          await getAdminListHandler();
        }, time);
      }
    } catch (e: any) {
      console.log('DELETE ADMIN error:', e);

      if (e === 'SETADMIN') {
        showToast(t('general.messages.accessDenied'), 'error');
      } else {
        showToast(errorFun(e), 'error');
      }
    }
  };

  const confirmDeleteAdmin = async () => {
    if (!selectedAdmin) {
      return;
    }

    await removeAdminHandler(selectedAdmin.phone, selectedAdmin.index);

    setDeleteModalVisible(false);
    setSelectedAdmin(null);
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

      {/* ========================= */}
      {/* UPDATE BUTTON */}
      {/* ========================= */}

      <View className="mt-5">
        <Button
          title={loading ? t('general.sending') : t('general.update')}
          variant="primary"
          fullWidth
          disabled={loading}
          loading={loading}
          onPress={getAdminListHandler}
          icon={<Refresh width={24} height={24} stroke="#ffffff" />}
        />
      </View>

      {/* ========================= */}
      {/* ADMIN LIST */}
      {/* فقط بعد از ADMINLIST */}
      {/* ========================= */}

      {adminListLoaded && (
        <>
          <View className="gap-3 my-5">
            {admins.map(item => (
              <View
                key={item.index}
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
                    {item.phone.replace('+', '')}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedAdmin(item);
                    setDeleteModalVisible(true);
                  }}
                  className="
                    bg-red-100
                    dark:bg-red-900/30
                    p-2
                    rounded-lg
                  "
                >
                  <Trash />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* ========================= */}
          {/* ADD ADMIN */}
          {/* ========================= */}

          {admins.length < 10 && (
            <View
              className="
                items-center justify-center gap-3
                border-2 border-dashed
                border-neutral-300 dark:border-neutral-600
                py-4 rounded-xl
              "
            >
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="
                  bg-neutral-200
                  dark:bg-neutral-700
                  rounded-full
                  p-3
                "
              >
                <Add width={58} height={58} stroke="#9CA3AF" />
              </TouchableOpacity>

              <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                {t('general.addAdmin')}
              </Text>
            </View>
          )}
        </>
      )}

      {/* ========================= */}
      {/* ADD ADMIN MODAL */}
      {/* ========================= */}

      <Modal
        visible={modalVisible}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center px-6 bg-black/60">
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
                  onPress={() => {
                    setModalVisible(false);
                    setAdminPhone('');
                  }}
                />
              </View>

              <View className="flex-1">
                <Button
                  title={loading ? t('general.sending') : t('general.add')}
                  disabled={loading || adminPhone.length !== 11}
                  loading={loading}
                  fullWidth
                  onPress={addAdminHandler}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* ========================= */}
      {/* DELETE MODAL */}
      {/* ========================= */}

      <Modal
        visible={deleteModalVisible}
        transparent
        statusBarTranslucent
        animationType="fade"
        onRequestClose={() => {
          setDeleteModalVisible(false);
          setSelectedAdmin(null);
        }}
      >
        <View className="flex-1 justify-center items-center px-6 bg-black/70">
          <View
            className="
              bg-white dark:bg-neutral-900
              w-full rounded-2xl
              p-5 gap-6 items-center
            "
          >
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
                  loading={loading}
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
