import { Model } from '@nozbe/watermelondb';
import { text, children } from '@nozbe/watermelondb/decorators';

export default class Supplier extends Model {
  static table = 'nha_cung_cap';
  static associations = {
    kho: { type: 'has_many', foreignKey: 'nha_cung_cap_id' },
  } as const;

  @text('ten_cong_ty') tenCongTy!: string;
  @text('email') email?: string;
  @text('dia_chi') diaChi?: string;
  @text('nguoi_lien_he') nguoiLienHe?: string;
  @text('ghi_chu') ghiChu?: string;

  @children('kho') khoItems: any;
}
