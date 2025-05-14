import { api } from 'src/boot/axios';
import { INVITE, INVITE_BY_ID, MY_INVITE } from 'src/modules/shared/endpoints';
import { UserRoles } from './user.model';
import { Vendor } from './vendor.model';

export enum InviteStatus {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  PENDING = 'pending',
}
export class Invite {
  id: number;
  userId: string;
  role: UserRoles;
  status: InviteStatus;
  vendorId: number;
  vendor: Vendor;

  constructor(obj: any) {
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key];
    });
  }

  static async getMyInvite() {
    const res = await api.get(MY_INVITE);
    if (res.data.invite) {
      return new Invite(res.data.invite);
    }
    return null;
  }

  static async inviteUser(data: {
    phone: string;
    role: UserRoles.ACCOUNTANT | UserRoles.EMPLOYEE;
  }) {
    await api.post(INVITE, data);
  }
  async respondToInvite(status: InviteStatus.ACCEPTED | InviteStatus.REJECTED) {
    await api.post(INVITE_BY_ID(this.id), { status });
    this.status = status;
  }
}
