import { api } from 'src/boot/axios';
import { isDate } from 'src/utils/date';
import { Pagination } from './pagination.model';
import * as ep from 'src/modules/management/endpoints';

export class Sector {
  id!: number;
  name!: string;
  description!: string;
  createdAt!: any;
  updatedAt!: any;

  constructor({ id, name, description, createdAt, updatedAt }: Partial<Sector>) {
    this.id = id!;
    this.name = name!;
    this.description = description!;
    this.createdAt = isDate(createdAt) ? new Date(createdAt as string) : createdAt;
    this.updatedAt = isDate(updatedAt) ? new Date(updatedAt as string) : updatedAt;
  }

  static async getAll(params?: any): Promise<Sector[]> {
    const { data } = await api.get(ep.SECTORS, { params });
    return data.map((item: any) => new Sector(item));
  }

  static async getById(id: number): Promise<Sector> {
    const all = Sector.getAll({});
    const sector = (await all).find((s) => s.id === id);
    if (!sector) {
      throw new Error('Sector not found');
    }
    return sector;
  }

  static create(sector: Partial<Sector>): Promise<Sector> {
    return api.post(ep.SECTORS, sector).then(({ data }) => new Sector(data));
  }

  static update(id: number, sector: Partial<Sector>): Promise<Sector> {
    return api.patch(ep.SECTOR_BY_ID(id), sector).then(({ data }) => new Sector(data));
  }

  static delete(id: number): Promise<void> {
    return api.delete(ep.SECTOR_BY_ID(id));
  }
}
