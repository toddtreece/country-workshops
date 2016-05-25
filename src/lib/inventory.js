import Converter from './converter';

export default class InventoryConverter extends Converter {

  fields = [
   'INVITEM',
   'NAME',
   'REFNUM',
   'TIMESTAMP',
   'INVITEMTYPE',
   'DESC',
   'PURCHASEDESC',
   'ACCNT',
   'ASSETACCNT',
   'COGSACCNT',
   'PRICE',
   'COST',
   'TAXABLE',
   'PAYMETH',
   'TAXVEND',
   'TAXDIST',
   'PREFVEND',
   'REORDERPOINT',
   'EXTRA',
   'CUSTFLD1',
   'CUSTFLD2',
   'CUSTFLD3',
   'CUSTFLD4',
   'CUSTFLD5',
   'DEP_TYPE',
   'ISPASSEDTHRU'
  ];

  out_path = 'out/inventory';

  constructor() {
    super();
  }

  valid(row) {
    return row.CW_CAT.trim() !== '';
  }

  INVITEM(row) { return 'INVITEM'; }
  NAME(row) { return row.CW_CAT; }
  REFNUM(row) { return row.CW_CAT; }
  REORDERPOINT(row) { return row.REORD_LEVL; }
  DESC(row) { return row.DESCRIPT; }
  PURCHASEDESC(row) { return row.DESCRIPT; }
  ACCNT(row) { return 'Sales'; }
  ASSETACCNT(row) { return 'Inventory Asset'; }
  COGSACCNT(row) { return 'Cost of Goods Sold'; }
  PRICE(row) { return row.CAT_PR; }
  COST(row) { return row.WHOLE_PR; }
  PREFVEND(row) { return row.VEND_NAME; }
  INVITEMTYPE(row) { return 'INVENTORY'; }
  CUSTFLD1(row) { return row.WHOLE_PR; }
  CUSTFLD2(row) { return row.SHIP_PR; }
  CUSTFLD3(row) { return row.CUSTOMS_PR; }
  CUSTFLD4(row) { return row.SHOP_COST; }
  CUSTFLD5(row) { return row.FUDGE_FACT; }

}
