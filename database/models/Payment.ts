import { Model } from '@nozbe/watermelondb';
import { text } from '@nozbe/watermelondb/decorators';

export default class Payment extends Model {
  static table = 'thanh_toan';

  @text('phuong_thuc') phuongThuc!: string;
  @text('hinh_anh') hinhAnh?: string; // QR code hoặc icon phương thức
}
