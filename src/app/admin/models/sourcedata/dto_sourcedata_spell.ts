import { SourceData_AreaEffect } from "./sourcedata_areaeffect";
import { SourceData_SpellDamage } from "./sourcedata_spelldamage";

export class DTO_SourceData_Spell {
    id?: string;
    name: string;
    description: string;
    level: number;
    castingTime: string;
    duration: string;
    concentration: boolean;
    components_Verbal: boolean;
    components_Somatic: boolean;
    components_Material: boolean;
    components_Material_Description: string;
    range: string;
    magicSchoolId: string;
    sourceId: string;
    abilityScoreId: string;

    areaEffect?: SourceData_AreaEffect;
    damage?: SourceData_SpellDamage[];
}