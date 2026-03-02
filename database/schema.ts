import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'thuoc',
      columns: [
        { name: 'ten_sp', type: 'string' },
        { name: 'ten_td', type: 'string' },
        { name: 'hoat_chat', type: 'string', isOptional: true },
        { name: 'ham_luong', type: 'string', isOptional: true },
        { name: 'quy_cach_dong_goi', type: 'string', isOptional: true },
        { name: 'dang_bao_che', type: 'string', isOptional: true },
        { name: 'hinh_anh', type: 'string', isOptional: true },
        { name: 'barcode', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'don_vi_tinh',
      columns: [
        { name: 'thuoc_id', type: 'string', isIndexed: true },
        { name: 'ten_don_vi', type: 'string' },
        { name: 'quy_doi', type: 'number' },
        { name: 'gia_ban', type: 'number' },
        { name: 'la_co_so', type: 'boolean' },
      ],
    }),
    tableSchema({
      name: 'khach_hang',
      columns: [
        { name: 'ho_va_ten', type: 'string' },
        { name: 'so_dt', type: 'string', isIndexed: true },
        { name: 'dia_chi', type: 'string', isOptional: true },
        { name: 'di_ung', type: 'string', isOptional: true },
        { name: 'ghi_chu', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'nha_cung_cap',
      columns: [
        { name: 'ten_cong_ty', type: 'string' },
        { name: 'email', type: 'string', isOptional: true },
        { name: 'dia_chi', type: 'string', isOptional: true },
        { name: 'nguoi_lien_he', type: 'string', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'kho',
      columns: [
        { name: 'thuoc_id', type: 'string', isIndexed: true },
        { name: 'nha_cung_cap_id', type: 'string', isIndexed: true },
        { name: 'so_lo', type: 'string' },
        { name: 'so_luong_ton', type: 'number' },
        { name: 'gia_von', type: 'number' },
        { name: 'hsd', type: 'number' },
        { name: 'vi_tri', type: 'string', isOptional: true },
        { name: 'ngay_nhap', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'don_hang',
      columns: [
        { name: 'khach_hang_id', type: 'string', isIndexed: true },
        { name: 'thanh_toan_id', type: 'string', isIndexed: true },
        { name: 'tong_tien', type: 'number' },
        { name: 'giam_gia', type: 'number' },
        { name: 'ghi_chu', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'chi_tiet_don_hang',
      columns: [
        { name: 'don_hang_id', type: 'string', isIndexed: true },
        { name: 'kho_id', type: 'string', isIndexed: true },
        { name: 'don_vi_tinh_id', type: 'string', isIndexed: true },
        { name: 'so_luong', type: 'number' },
        { name: 'gia_ban_tai_thoi_diem', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'thanh_toan',
      columns: [
        { name: 'phuong_thuc', type: 'string' },
        { name: 'hinh_anh', type: 'string', isOptional: true },
      ],
    }),
  ],
});
