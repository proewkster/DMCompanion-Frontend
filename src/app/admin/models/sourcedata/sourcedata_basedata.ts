import { SourceData_Source } from './sourcedata_source';

export abstract class SourceData_BaseData {
    id: string;
    name: string;
    description: string;
    source: SourceData_Source;
}