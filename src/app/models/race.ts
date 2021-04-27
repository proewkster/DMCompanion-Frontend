import { RaceType } from "../enums/race-type.enum";
import { Source } from "../enums/source.enum";

export class Race {
    public id: number
    public raceId: string;
    public name: string;
    public description: string;
    public type: string;
    public sourceId: string;
    public parentId?: string;


    constructor(
        id: number,
        raceId: string,
        name: string,
        description: string,
        type: string,
        sourceId: string,
        parentId?: string
    ) {
        this.id = id
        this.raceId = raceId
        this.name = name
        this.description = description
        this.type = type
        this.sourceId = sourceId
        this.parentId = parentId
    }


}
