import React, { useContext, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useGlobalSearchParams } from 'expo-router';
import { CameraIcon, TrashIcon, PlusIcon, ScanBarcodeIcon, SearchIcon } from 'lucide-react-native';

import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
} from '@/components/ui/form-control';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Button, ButtonText, ButtonGroup, ButtonIcon } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Icon } from '@/components/ui/icon';
import { LoadingOverlay } from '@/components/loading/loading-overlay';

import { ImageContext } from '@/services/image/image-context';
import {
  MedicineFormInput,
  MedicineFormOutput,
  MedicineSchema,
} from '../../services/medicine/validate';
import { formatCurrencyVN } from '@/services/helpers/currency-VN';

type FormProps = {
  id?: string;
  initialData?: MedicineFormOutput;
  submitLabel?: string;
  onSubmit: (data: MedicineFormOutput) => Promise<void>;
  onSuccess?: (resetForm: () => void) => Promise<void>;
};

function Form({ id, initialData, submitLabel = 'Lưu', onSubmit, onSuccess }: FormProps) {
  const { imageUri, open, reset: resetImage, saveImage } = useContext(ImageContext);
  const { colorScheme } = useColorScheme();
  const { barcode } = useGlobalSearchParams();

  const {
    control,
    formState: { isDirty, isSubmitting, errors, isReady },
    setValue,
    reset,
    watch,
    handleSubmit,
  } = useForm<MedicineFormInput, any, MedicineFormOutput>({
    resolver: zodResolver(MedicineSchema()),
    defaultValues: {
      tenSP: initialData?.tenSP || '',
      tenTD: initialData?.tenTD || '',
      hoatChat: initialData?.hoatChat || '',
      hamLuong: initialData?.hamLuong || '',
      quyCachDongGoi: initialData?.quyCachDongGoi || '',
      dangBaoChe: initialData?.dangBaoChe || '',
      barcode: initialData?.barcode || '',
      hinhAnh: initialData?.hinhAnh || '',
      donViTinhs: initialData?.donViTinhs || [
        { tenDonVi: '', quyDoi: '1', giaBan: '', laCoSo: true },
      ],
    },
    mode: 'onTouched',
  });

  const tenDonViCoSo = watch('donViTinhs.0.tenDonVi');
  const { fields, append, remove } = useFieldArray({ control, name: 'donViTinhs' });

  useEffect(() => {
    if (barcode) {
      setValue('barcode', barcode.toString(), { shouldDirty: true });
    }
  }, [barcode, setValue]);

  useEffect(() => {
    if (imageUri) {
      setValue('hinhAnh', imageUri, { shouldDirty: true });
    }
  }, [imageUri, setValue]);

  const handleResetForm = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn đặt lại biểu mẫu?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đặt lại',
          style: 'destructive',
          onPress: () => {
            reset();
            resetImage();
            Toast.show({
              type: 'success',
              text1: 'Thông báo',
              text2: 'Biểu mẫu đã được đặt lại',
            });
          },
        },
      ],
      { userInterfaceStyle: colorScheme }
    );
  };

  const handleSubmitForm = async (data: MedicineFormOutput) => {
    try {
      let finalData = { ...data };
      if (imageUri && !imageUri.startsWith('http')) {
        const savedUri = await saveImage(imageUri);

        if (savedUri == null) {
          throw new Error('Không thể lưu ảnh, vui lòng thử lại');
        }

        finalData.hinhAnh = savedUri;
      }

      await onSubmit(finalData);
      if (onSuccess) {
        await onSuccess(() => reset());
      }
    } catch (error) {
      console.error('Submit Error:', error);
      Toast.show({ type: 'error', text1: 'Lỗi', text2: 'Không thể lưu thông tin' });
    }
  };

  if (!isReady) {
    return (
      <SafeAreaView className="flex-1 bg-background-50" edges={['bottom']}>
        <LoadingOverlay isVisible={true} message="Đang tải biểu mẫu..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background-50" edges={['bottom']}>
      <LoadingOverlay isVisible={isSubmitting} message="Đang xử lý..." />

      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        extraScrollHeight={100}
        enableOnAndroid>
        <VStack space="md" className="p-4">
          <Box className="rounded-xl border border-outline-100 bg-background-0 p-4">
            <Heading size="sm" className="mb-4 text-primary-600">
              Hình ảnh sản phẩm
            </Heading>
            <FormControl isInvalid={!!errors.hinhAnh}>
              <Controller
                control={control}
                name="hinhAnh"
                render={({ field: { value } }) => (
                  <TouchableOpacity onPress={open}>
                    {value ? (
                      <Image
                        source={{ uri: value }}
                        alt="Medicine Image"
                        className="h-48 w-full rounded-lg"
                        resizeMode="cover"
                      />
                    ) : (
                      <Box className="h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-outline-300 bg-background-50">
                        <VStack space="xs" className="items-center">
                          <Icon as={CameraIcon} size="xl" className="text-typography-400" />
                          <Text size="sm" className="text-typography-500">
                            Chạm để tải ảnh
                          </Text>
                        </VStack>
                      </Box>
                    )}
                  </TouchableOpacity>
                )}
              />
            </FormControl>
          </Box>

          <Box className="rounded-xl border border-outline-100 bg-background-0 p-4">
            <Heading size="sm" className="mb-4 text-primary-600">
              Thông tin cơ bản
            </Heading>
            <VStack space="lg">
              <FormControl isInvalid={!!errors.tenSP} isRequired>
                <FormControlLabel>
                  <FormControlLabelText>Tên sản phẩm</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="tenSP"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input size="lg">
                      <InputField
                        placeholder="Nhập tên thuốc..."
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      <InputSlot className="pr-3">
                        <InputIcon as={SearchIcon} />
                      </InputSlot>
                    </Input>
                  )}
                />
                <FormControlError>
                  <FormControlErrorText>{errors.tenSP?.message}</FormControlErrorText>
                </FormControlError>
              </FormControl>

              <FormControl isInvalid={!!errors.tenTD} isRequired>
                <FormControlLabel>
                  <FormControlLabelText>Tên thường dùng (Biệt dược)</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="tenTD"
                  render={({ field: { onChange, value } }) => (
                    <Input size="lg">
                      <InputField
                        placeholder="VD: Panadol Effervescent"
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                />
                <FormControlError>
                  <FormControlErrorText>{errors.tenTD?.message}</FormControlErrorText>
                </FormControlError>
              </FormControl>

              <FormControl isInvalid={!!errors.barcode}>
                <FormControlLabel>
                  <FormControlLabelText>Mã vạch / Barcode</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="barcode"
                  render={({ field: { onChange, value } }) => (
                    <HStack space="sm" className="items-center">
                      <Input className="flex-1" size="lg">
                        <InputField
                          placeholder="Quét hoặc nhập mã"
                          onChangeText={onChange}
                          value={value}
                        />
                      </Input>

                      <Button>
                        <ButtonIcon as={ScanBarcodeIcon} />
                      </Button>
                    </HStack>
                  )}
                />
              </FormControl>
            </VStack>
          </Box>

          <Box className="rounded-xl border border-outline-100 bg-background-0 p-4">
            <Heading size="sm" className="mb-4 text-primary-600">
              Thông tin chi tiết
            </Heading>
            <VStack space="lg">
              <HStack space="md">
                <FormControl className="flex-1">
                  <FormControlLabel>
                    <FormControlLabelText>Hoạt chất</FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={control}
                    name="hoatChat"
                    render={({ field: { onChange, value } }) => (
                      <Input>
                        <InputField
                          placeholder="Paracetamol"
                          onChangeText={onChange}
                          value={value}
                        />
                      </Input>
                    )}
                  />
                </FormControl>
                <FormControl className="flex-1">
                  <FormControlLabel>
                    <FormControlLabelText>Hàm lượng</FormControlLabelText>
                  </FormControlLabel>
                  <Controller
                    control={control}
                    name="hamLuong"
                    render={({ field: { onChange, value } }) => (
                      <Input>
                        <InputField placeholder="500mg" onChangeText={onChange} value={value} />
                      </Input>
                    )}
                  />
                </FormControl>
              </HStack>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Dạng bào chế</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="dangBaoChe"
                  render={({ field: { onChange, value } }) => (
                    <Input>
                      <InputField
                        placeholder="Viên sủi, Viên nén..."
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                />
              </FormControl>
            </VStack>
          </Box>

          <Box className="rounded-xl border border-outline-100 bg-background-0 p-4">
            <HStack className="mb-4 items-center justify-between">
              <Heading size="sm" className="text-primary-600">
                Đơn vị tính & Giá
              </Heading>
              <Button
                variant="outline"
                size="xs"
                action="primary"
                isDisabled={fields.length >= 10}
                onPress={() => append({ tenDonVi: '', quyDoi: '1', giaBan: '', laCoSo: false })}>
                <ButtonIcon as={PlusIcon} className="mr-1" />
                <ButtonText>Thêm ĐVT</ButtonText>
              </Button>
            </HStack>

            <VStack space="lg">
              {fields.map((item, index) => (
                <Box
                  key={item.id}
                  className="rounded-lg border border-outline-200 bg-background-50 p-3">
                  <HStack className="mb-2 items-center justify-between">
                    <Text size="sm" className="font-bold text-typography-700">
                      Đơn vị {index + 1} {fields[index].laCoSo ? '(Gốc)' : ''}
                    </Text>
                    {!fields[index].laCoSo && (
                      <TouchableOpacity onPress={() => remove(index)}>
                        <Icon as={TrashIcon} size="sm" className="text-error-500" />
                      </TouchableOpacity>
                    )}
                  </HStack>

                  <VStack space="md">
                    <HStack space="sm">
                      <FormControl
                        className="flex-[2]"
                        isInvalid={!!errors.donViTinhs?.[index]?.tenDonVi}>
                        <Controller
                          control={control}
                          name={`donViTinhs.${index}.tenDonVi`}
                          render={({ field: { onChange, value } }) => (
                            <Input size="sm">
                              <InputField
                                placeholder="Tên ĐVT (Viên, Hộp...)"
                                onChangeText={onChange}
                                value={value}
                              />
                            </Input>
                          )}
                        />

                        <FormControlError>
                          <FormControlErrorText size="xs">
                            {errors.donViTinhs?.[index]?.tenDonVi?.message}
                          </FormControlErrorText>
                        </FormControlError>
                      </FormControl>

                      <FormControl
                        className="flex-1"
                        isInvalid={!!errors.donViTinhs?.[index]?.quyDoi}>
                        <Controller
                          control={control}
                          name={`donViTinhs.${index}.quyDoi`}
                          render={({ field: { onChange, value } }) => (
                            <Input size="sm" isDisabled={fields[index].laCoSo}>
                              <InputField
                                keyboardType="numeric"
                                placeholder="Tỷ lệ"
                                onChangeText={onChange}
                                value={String(value)}
                              />
                            </Input>
                          )}
                        />
                        <FormControlError>
                          <FormControlErrorText size="xs">
                            {errors.donViTinhs?.[index]?.quyDoi?.message}
                          </FormControlErrorText>
                        </FormControlError>
                        {!fields[index].laCoSo && (
                          <FormControlHelper>
                            <FormControlHelperText size="xs">
                              x {tenDonViCoSo || '...'}
                            </FormControlHelperText>
                          </FormControlHelper>
                        )}
                      </FormControl>
                    </HStack>

                    <FormControl isInvalid={!!errors.donViTinhs?.[index]?.giaBan}>
                      <Controller
                        control={control}
                        name={`donViTinhs.${index}.giaBan`}
                        render={({ field: { onChange, value } }) => (
                          <Input size="sm">
                            <InputField
                              keyboardType="numeric"
                              placeholder="Giá bán"
                              onChangeText={onChange}
                              value={formatCurrencyVN(String(value))}
                            />
                            <InputSlot className="pr-2">
                              <Text size="xs">đ</Text>
                            </InputSlot>
                          </Input>
                        )}
                      />
                      <FormControlError>
                        <FormControlErrorText size="xs">
                          {errors.donViTinhs?.[index]?.giaBan?.message}
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                  </VStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </KeyboardAwareScrollView>

      <ButtonGroup flexDirection="row" className="w-full bg-background-0 p-4">
        <Button
          isDisabled={!isDirty}
          onPress={handleResetForm}
          className="flex-1"
          variant="outline"
          size="xl">
          <ButtonText>Đặt lại</ButtonText>
        </Button>

        <Button className="flex-1" size="xl" onPress={handleSubmit(handleSubmitForm)}>
          <ButtonText>{submitLabel}</ButtonText>
        </Button>
      </ButtonGroup>
    </SafeAreaView>
  );
}

export { Form };
