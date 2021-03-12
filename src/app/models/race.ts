import { RaceType } from "../enums/race-type.enum";
import { Source } from "../enums/source.enum";

export class Race {
    public id: string;
    public name: string;
    public description: string;
    public type: RaceType;
    public source: Source;
    public path: string;

    constructor(
        id: string,
        name: string,
        description: string,
        type: RaceType,
        source: Source,
        path: string
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.type = type
        this.source = source
        this.path = path
    }

}
