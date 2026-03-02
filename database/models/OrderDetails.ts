import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class OrderDetails extends Model {
  static table = 'chi_tiet_don_hang';
  static associations = {
    don_hang: { type: 'belongs_to', key: 'don_hang_id' },
  } as const;

  @field('so_luong') soLuong!: number;
  @field('gia_ban_tai_thoi_diem') giaBanTaiThoiDiem!: number;

  @relation('don_hang', 'don_hang_id') donHangId: any;
  @relation('kho', 'kho_id') khoId!: any;
  @relation('don_vi_tinh', 'don_vi_tinh_id') donViTinh: any;
}
