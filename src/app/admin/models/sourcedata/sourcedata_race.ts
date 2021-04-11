import { SourceData_Source } from './sourcedata_source';
export class SourceData_Race {
    id: string;
    name: string;
    description: string;
    type: string;
    sourceId: string;
    parentId: string;
    subRaces: SourceData_Race[];
    parentRace: SourceData_Race;
    source: SourceData_Source;
}