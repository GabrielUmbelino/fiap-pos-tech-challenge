export interface IService<T> {
  create(type: T): Promise<T>;

  edit(type: T): Promise<T>;

  delete(id: number): Promise<void>;

  find(attributes: Partial<T>): Promise<T[]>;
  findAll(): Promise<T[]>;
}
