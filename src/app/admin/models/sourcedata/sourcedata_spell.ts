import { SourceData_AbilityScore } from "./sourcedata_abilityscore";
import { SourceData_AreaEffect } from "./sourcedata_areaeffect";
import { SourceData_MagicSchool } from "./sourcedata_magicschool";
import { SourceData_Source } from "./sourcedata_source";
import { SourceData_SpellDamage } from "./sourcedata_spelldamage";

export class SourceData_Spell {
    id: string;
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

    magicSchool: SourceData_MagicSchool;
    source: SourceData_Source;
    savingThrowType: SourceData_AbilityScore;
    areaEffect: SourceData_AreaEffect;
    damage: SourceData_SpellDamage[];
}