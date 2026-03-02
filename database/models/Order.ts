import { Model } from '@nozbe/watermelondb';
import { field, text, date, readonly, children, relation } from '@nozbe/watermelondb/decorators';

export default class Order extends Model {
  static table = 'don_hang';
  static associations = {
    chi_tiet_don_hang: { type: 'has_many', foreignKey: 'don_hang_id' },
  } as const;

  @field('tong_tien') tongTien!: number;
  @field('giam_gia') giamGia!: number;
  @text('ghi_chu') ghiChu?: string;
  @readonly @date('created_at') createdAt!: Date;

  @relation('khach_hang', 'khach_hang_id') khachHang: any;
  @relation('thanh_toan', 'thanh_toan_id') thanhToan: any;
  @children('chi_tiet_don_hang') chiTietDonHangs: any;
}
