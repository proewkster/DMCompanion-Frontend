export class DtoNewRace {
  public name: string;
  public description: string;
  public type: string;
  public sourceId: string;
  public id?: string
  public raceId?: string;
  public parentId?: string;



  constructor(
    name: string,
    description: string,
    type: string,
    sourceId: string,
    id?: string,
    raceId?: string,
    parentId?: string
  ) {
    this.name = name
    this.description = description
    this.type = type
    this.sourceId = sourceId
    this.id = id
    this.raceId = raceId
    this.parentId = parentId
  }


}
