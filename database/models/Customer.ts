import { Model } from '@nozbe/watermelondb';
import { text, children } from '@nozbe/watermelondb/decorators';

export default class Customer extends Model {
  static table = 'khach_hang';
  static associations = {
    don_hang: { type: 'has_many', foreignKey: 'khach_hang_id' },
  } as const;

  @text('ho_va_ten') hoVaTen!: string;
  @text('so_dt') soDt!: string;
  @text('dia_chi') diaChi?: string;
  @text('di_ung') diUng?: string;
  @text('ghi_chu') ghiChu?: string;

  @children('don_hang') donHangs: any;
}
