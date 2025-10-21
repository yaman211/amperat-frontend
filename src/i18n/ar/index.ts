// This is just an example,
// so you can safely delete all default props below

import { ClockStatus } from 'src/models/clock.model';
import { UserRoles } from 'src/models/user.model';

export default {
  userRoles: {
    [UserRoles.ACCOUNTANT]: 'محاسب',
    [UserRoles.EMPLOYEE]: 'موظف',
    [UserRoles.MANAGER]: 'مدير',
    [UserRoles.CUSTOMER]: 'زبون',
    [UserRoles.SUPER_ADMIN]: 'مدير النظام',
  },
  clockStatus: {
    [ClockStatus.ACTIVE]: 'فعالة',
    [ClockStatus.OFF]: 'مقطوعة',
  },
};
