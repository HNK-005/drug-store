import { Model, Q } from '@nozbe/watermelondb';
import { text, date, readonly, children, lazy } from '@nozbe/watermelondb/decorators';

export default class Medicine extends Model {
  static table = 'thuoc';
  static associations = {
    don_vi_tinh: { type: 'has_many', foreignKey: 'thuoc_id' },
    kho: { type: 'has_many', foreignKey: 'thuoc_id' },
  } as const;

  @text('ten_sp') tenSP!: string;
  @text('ten_td') tenTD!: string;
  @text('hoat_chat') hoatChat?: string;
  @text('ham_luong') hamLuong?: string;
  @text('quy_cach_dong_goi') quyCachDongGoi?: string;
  @text('dang_bao_che') dangBaoChe?: string;
  @text('hinh_anh') hinhAnh?: string;
  @text('barcode') barcode?: string;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @children('don_vi_tinh') donViTinhs: any;

  get rawData() {
    return {
      id: this.id,
      tenSP: this.tenSP,
      tenTD: this.tenTD,
      hinhAnh: this.hinhAnh,
      hoatChat: this.hoatChat,
      hamLuong: this.hamLuong,
      quyCachDongGoi: this.quyCachDongGoi,
      dangBaoChe: this.dangBaoChe,
      barcode: this.barcode,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  @lazy unitsQuery = this.collections.get('don_vi_tinh').query(Q.where('thuoc_id', this.id));
}
