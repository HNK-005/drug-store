import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import migrations from './migration';
import {
  Medicine,
  OrderDetails,
  Order,
  Unit,
  Customer,
  Inventory,
  Supplier,
  Payment,
} from './models';

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  jsi: true,
  dbName: 'DrugStoreDB',
  onSetUpError: (error) => {
    console.error('Database failed to load', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Medicine, OrderDetails, Order, Unit, Customer, Inventory, Supplier, Payment],
});
