export const MY_USERS = '/users/my';
export const USER_BY_ID = (id: number) => `/users/${id}`;
export const VENDOR_BY_ID = (id: number) => `/vendors/${id}`;
export const VENDOR_SEARCH = `/vendors/search`;
export const CLOCK_INVOICE_BY_ID = (clockId: number) => `/invoices/${clockId}`;
export const INVOICE_BY_ID = (id: number) => `/invoices/details/${id}`;
export const REVERT_LAST_INVOICE = (clockId: number) => `/invoices/${clockId}/revert-last-invoice`;
export const CLOCKS_BY_BOX = (boxId: number) => `/boxes/${boxId}/clocks`;
export const CLOCKS_BY_BOX_BY_NUMBER = (boxNumber: number) =>
  `/boxes/${boxNumber}/clocks-by-box-number`;

export const SECTOR_BY_ID = (id: number) => `/sectors/${id}`;
export const SECTORS = '/sectors';

export const BOX_BY_ID = (id: number) => `/boxes/${id}`;
export const BOXES_BY_SECTOR_ID = (sectorId: number) => `/boxes/sector/${sectorId}`;
export const BOXES = '/boxes';
