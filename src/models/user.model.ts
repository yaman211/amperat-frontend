import { api } from 'src/boot/axios';
import { ME } from 'src/modules/auth/endpoints';
import { MY_USERS, USER_BY_ID, USERS_LIST } from 'src/modules/management/endpoints';
import { Invite } from './invite.model';
import { Pagination } from './pagination.model';
import { Vendor } from './vendor.model';
import { UPDATE_USER } from 'src/modules/admin/endpoints';

export enum UserRoles {
  CUSTOMER = 'customer',
  EMPLOYEE = 'employee',
  ACCOUNTANT = 'accountant',
  MANAGER = 'manager',
  SUPER_ADMIN = 'super-admin',
  GOVERNMENTAL = 'governmental',
}

export default class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  password!: string;
  phone!: string;
  isVerified!: boolean;
  role!: UserRoles;
  vendorId!: number | null;
  vendor!: Vendor | null;
  myInvite!: Invite | null;

  constructor(obj: any) {
    Object.keys(obj).forEach((key) => {
      this[key] = obj[key];
    });
    if (obj.vendor) {
      this.vendor = new Vendor(obj.vendor);
    }
  }

  static async getMyUsers(params = {}) {
    const res = await api.get(MY_USERS, {
      params: params,
    });
    const data = new Pagination(User, res.data);
    return data;
  }

  static async getUsersList(params = {}) {
    const res = await api.get(USERS_LIST, {
      params: params,
    });
    const data = new Pagination(User, res.data);
    return data;
  }

  static async getUserById(id: number) {
    const res = await api.get(USER_BY_ID(id));
    return new User(res.data);
  }

  async refreshMe() {
    const res = await api.get(ME);
    const { user, token } = res.data;
    Object.assign(this, new User(user));
    return { user, token } as { user: User; token: string };
  }

  async updateUserRole(role: UserRoles.ACCOUNTANT | UserRoles.EMPLOYEE) {
    await api.put(USER_BY_ID(this.id), {
      role,
    });
    this.role = role;
  }

  async removeFromVendor() {
    await api.delete(USER_BY_ID(this.id));
    this.vendor = null;
    this.vendorId = null;
  }

  async update(data: any) {
    await api.put(UPDATE_USER(this.id), data);
  }

  public get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  public get isManager() {
    return this.role === UserRoles.MANAGER;
  }

  public get isEmployee() {
    return this.role === UserRoles.EMPLOYEE;
  }

  public get isAccountant() {
    return this.role === UserRoles.ACCOUNTANT;
  }

  public get isGovernmental() {
    return this.role === UserRoles.GOVERNMENTAL;
  }

  public get isSuperAdmin() {
    return this.role === UserRoles.SUPER_ADMIN;
  }
}
