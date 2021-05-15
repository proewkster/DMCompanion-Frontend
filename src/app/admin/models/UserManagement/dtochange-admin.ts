export class DTOChangeAdmin {
    public id: string;
    public isAdmin: boolean;

  constructor(id: string, isAdmin: boolean) {
    this.id = id
    this.isAdmin = isAdmin
  }

}
