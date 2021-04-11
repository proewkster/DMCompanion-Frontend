import { SourceData_Source } from "./sourcedata_source";

export class SourceData_Feat {
    id: string;
    name: string;
    description: string;
    type: string;
    stacking: boolean;
    source: SourceData_Source;
}