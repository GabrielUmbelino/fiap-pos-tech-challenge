export interface IRepository<T> {
  create(type: T): Promise<T>;

  find(id?: number, status?: string, term?: string): Promise<T[]>;

  findById(id: number): Promise<T>;

  edit(type: T): Promise<T>;

  delete(id: number): Promise<void>;

  findAll(): Promise<T[]>;
}
