import { Model } from '@nozbe/watermelondb';
import { field, text, relation } from '@nozbe/watermelondb/decorators';

export default class Unit extends Model {
  static table = 'don_vi_tinh';
  static associations = {
    thuoc: { type: 'belongs_to', key: 'thuoc_id' },
  } as const;

  @text('ten_don_vi') tenDonVi!: string;
  @field('quy_doi') quyDoi!: number;
  @field('gia_ban') giaBan!: number;
  @field('la_co_so') laCoSo!: boolean;

  get rawData() {
    return {
      id: this.id,
      tenDonVi: this.tenDonVi,
      quyDoi: this.quyDoi,
      giaBan: this.giaBan,
      laCoSo: this.laCoSo,
    };
  }

  @relation('thuoc', 'thuoc_id') thuoc: any;
}
