export const INVITE = '/invites';
export const MY_INVITE = '/invites/my';
export const INVITE_BY_ID = (id: number) => `/invites/${id}`;
export const MY_CLOCKS = '/clocks/my';
export const CLOCKS = '/clocks';
export const CLOCKS_SEARCH = '/clocks/search';
export const CLOCK_BY_ID = (id: number) => `/clocks/${id}`;
export const CLOCK_BY_ID_READINGS = (id: number) => `/clocks/${id}/readings`;
export const CLOCK_BY_ID_INVOICES = (id: number) => `/clocks/${id}/invoices`;
export const CLOCK_BY_ID_LAST_READING = (id: number) =>
  `/clocks/${id}/readings/last`;
