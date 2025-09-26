import { api } from 'src/boot/axios';
import { Pagination } from './pagination.model';
import * as ep from 'src/modules/management/endpoints';

export class Box {
  id!: number;
  boxNumber!: number;
  sectorId!: number;

  constructor({ id, boxNumber, sectorId }: Partial<Box>) {
    this.id = id!;
    this.boxNumber = boxNumber!;
    this.sectorId = sectorId!;
  }

  static async getSectorBoxes(sectorId: number): Promise<Box[]> {
    const { data } = await api.get(ep.BOXES_BY_SECTOR_ID(sectorId));
    return data.map((item: any) => new Box(item));
  }

  static async getById(sectorId: number, id: number): Promise<Box> {
    const boxes = await this.getSectorBoxes(sectorId);
    return boxes.find((box) => box.id === id)!;
  }

  static create(box: Partial<Box>): Promise<Box> {
    box.boxNumber = Number(box.boxNumber);
    return api.post(ep.BOXES, box).then(({ data }) => new Box(data));
  }

  static update(id: number, box: Partial<Box>): Promise<Box> {
    return api.patch(ep.BOX_BY_ID(id), box).then(({ data }) => new Box(data));
  }

  static delete(id: number): Promise<void> {
    return api.delete(ep.BOX_BY_ID(id));
  }
}
