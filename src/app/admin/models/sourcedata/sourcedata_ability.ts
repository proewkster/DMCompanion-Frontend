import { SourceData_Source } from "./sourcedata_source";

export class SourceData_Ability {
    id: string;
    name: string;
    description: string;
    type: string;
    restoreCondition: string;
    maxSlots: number;
    source: SourceData_Source;
}