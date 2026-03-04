import { database } from '..';
import { Medicine, Unit } from '../models';
import { Q } from '@nozbe/watermelondb';

export interface IMedicine {
  id: string;
  tenSP: string;
  tenTD: string;
  hoatChat?: string;
  hamLuong?: string;
  quyCachDongGoi?: string;
  dangBaoChe?: string;
  barcode?: string;
  hinhAnh?: string;
}

const MedicineService = {
  create: (data: Omit<IMedicine, 'id'>) => {
    return database.get<Medicine>('thuoc').prepareCreate((medicine) => {
      Object.assign(medicine, data);
    });
  },

  findById: async (id: string) => {
    const medicine = await database.get<Medicine>('thuoc').find(id);
    const units = (await medicine.donViTinhs.fetch()) as Unit[];

    return {
      ...medicine.rawData,
      donViTinhs: units.map((unit) => unit.rawData),
    };
  },

  findIdByBarcode: async (barcode: string) => {
    const medicines = await database
      .get<Medicine>('thuoc')
      .query(Q.where('barcode', barcode))
      .fetchIds();

    return medicines[0];
  },

  isBarcodeExists: async (id: string, barcode: string) => {
    if (!barcode) return false;
    const count = await database
      .get<Medicine>('thuoc')
      .query(Q.where('barcode', barcode), Q.where('id', Q.notEq(id)))
      .fetchCount();

    return count > 0;
  },
};

export default MedicineService;
