import { database } from '@/database';
import { MedicineFormOutput } from '@/services/medicine/validate';
import MedicineService from '@/database/services/MedicineService';
import UnitService from '@/database/services/UnitService';

export const createNewMedicine = async (data: MedicineFormOutput): Promise<void> => {
  await database.write(async () => {
    const { donViTinhs, ...medicineData } = data;
    const medicine = MedicineService.create(medicineData);

    const units = donViTinhs.map((unit) =>
      UnitService.create(
        {
          ...unit,
        },
        medicine
      )
    );

    await database.batch(medicine, ...units);
  });
};
