export class DtoNewRace {
  public id: string;
  public name: string;
  public description: string;
  public type: string;
  public sourceId: string;
  public parentId?: string;




  constructor(
    id: string,
    name: string,
    description: string,
    type: string,
    sourceId: string,
    parentId?: string,

  ) {
    this.id = id
    this.name = name
    this.description = description
    this.type = type
    this.sourceId = sourceId
    this.parentId = parentId

  }


}
