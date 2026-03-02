import { Model } from '@nozbe/watermelondb';
import { field, text, date, readonly, relation } from '@nozbe/watermelondb/decorators';

export default class Inventory extends Model {
  static table = 'kho';
  static associations = {
    thuoc: { type: 'belongs_to', key: 'thuoc_id' },
    nha_cung_cap: { type: 'belongs_to', key: 'nha_cung_cap_id' },
  } as const;

  @text('so_lo') soLo!: string;
  @field('so_luong_ton') soLuongTon!: number;
  @field('gia_von') giaVon!: number;
  @date('hsd') hsd!: Date;
  @text('vi_tri') viTri?: string;
  @readonly @date('ngay_nhap') ngayNhap!: Date;

  @relation('thuoc', 'thuoc_id') thuoc: any;
  @relation('nha_cung_cap', 'nha_cung_cap_id') nhaCungCapId: any;
}
