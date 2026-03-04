import * as z from 'zod';
import { parseCurrencyVN } from '@/services/helpers/currency-VN';

export function isEan13Valid(barcode: string): boolean {
  if (!/^\d{13}$/.test(barcode)) return false;

  let sum = 0;

  for (let i = 0; i < 12; i++) {
    const digit = parseInt(barcode[i], 10);
    sum += i % 2 === 0 ? digit : digit * 3;
  }

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;

  return calculatedCheckDigit === parseInt(barcode[12], 10);
}

export const MedicineSchema = () =>
  z.object({
    tenSP: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
    tenTD: z.string().min(1, 'Tên thường dùng là bắt buộc'),
    hoatChat: z.string().optional(),
    hamLuong: z.string().optional(),
    quyCachDongGoi: z.string().optional(),
    dangBaoChe: z.string().optional(),
    barcode: z
      .string()
      .trim()
      .refine((val) => val === '' || val.length === 13, {
        message: 'Mã vạch phải có đúng 13 ký tự',
      })
      .refine((val) => isEan13Valid(val), {
        message: 'Mã vạch EAN-13 không hợp lệ',
      })
      .optional()
      .or(z.literal('')),
    hinhAnh: z.string().optional(),
    donViTinhs: z
      .array(
        z.object({
          tenDonVi: z.string().min(1, 'Tên ĐVT là bắt buộc'),
          quyDoi: z.coerce
            .number('Tỷ lệ quy đổi phải là số')
            .min(1, 'Tỷ lệ quy đổi phải lớn hơn 0')
            .max(999999, 'Tỷ lệ quy đổi phải trong khoảng 1 - 999999'),
          giaBan: z.preprocess(
            (val) => {
              if (typeof val === 'string') {
                return parseCurrencyVN(val);
              }
              return val;
            },
            z.coerce
              .number()
              .min(1, 'Giá bán phải lớn hơn 0')
              .max(999999999, 'Giá bán phải trong khoảng 1đ - 999.999.999đ')
          ),
          laCoSo: z.boolean(),
        })
      )
      .min(1, 'Cần ít nhất một đơn vị tính')
      .max(10, 'Chỉ được thêm tối đa 10 đơn vị tính'),
  });

export type MedicineFormInput = z.input<ReturnType<typeof MedicineSchema>>;
export type MedicineFormOutput = z.output<ReturnType<typeof MedicineSchema>>;
