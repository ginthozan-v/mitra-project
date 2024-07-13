export class RolePermission {
  code: string;
  description?: string;
  create = false;
  update = true;
  read = true;
  delete = false;
  accessible? = true;
  public constructor(init?: Partial<RolePermission>) {
    if (init) Object.assign(this, init);
    this.accessible = this.create || this.update || this.read || this.delete;
  }
}
