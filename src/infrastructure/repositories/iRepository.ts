export interface IRepository<T> {
  create(type: T): Promise<T>;

  find(attributes: Partial<T>): Promise<T[]>;

  edit(type: T): Promise<T>;

  delete(id: number): Promise<void>;

  findAll(): Promise<T[]>;
}
