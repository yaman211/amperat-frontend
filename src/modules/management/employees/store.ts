import { defineStore } from 'pinia';
import User, { UserRoles } from 'src/models/user.model';
import storesNames from 'src/stores/stores-names';
import { PER_PAGE } from 'src/utils/constants';

export const useEmployeesStore = defineStore(storesNames.MANAGEMENT.EMPLOYEES, {
  state: () =>
    ({
      loading: false,
      employees: [],
      count: 0,
    } as {
      loading: boolean;
      employees: User[];
      count: number;
    }),
  getters: {},
  actions: {
    async fetchEmployees(page: number) {
      this.loading = true;
      try {
        const data = await User.getMyUsers({
          offset: page * PER_PAGE,
          limit: PER_PAGE,
        });
        this.count = data.count;
        this.employees.push(...data.rows);
      } finally {
        this.loading = false;
      }
    },
    async removeEmployee(employee: User) {
      await employee.removeFromVendor();
      const idx = this.employees.findIndex((e) => e.id === employee.id);
      if (idx + 1) {
        this.count--;
        this.employees.splice(idx, 1);
      }
    },
    async updateEmployeeRole(
      employee: User,
      role: UserRoles.ACCOUNTANT | UserRoles.EMPLOYEE
    ) {
      await employee.updateUserRole(role);
    },
  },
});
