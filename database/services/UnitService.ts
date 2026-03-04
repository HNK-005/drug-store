import { database } from '..';
import { Medicine, Unit } from '../models';

export interface IUnit {
  id?: string;
  thuoc?: string;
  tenDonVi: string;
  quyDoi: number;
  giaBan: number;
  laCoSo: boolean;
}

const UnitService = {
  create: (data: IUnit, medicine: Medicine) => {
    return database.get<Unit>('don_vi_tinh').prepareCreate((unit) => {
      const { thuoc, ...unitData } = data;
      Object.assign(unit, unitData);
      unit.thuoc.set(medicine);
    });
  },
};

export default UnitService;
