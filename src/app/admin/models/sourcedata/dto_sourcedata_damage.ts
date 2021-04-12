import { DTO_SourceData_DamageType } from "./dto_sourcedata_damagetype";

export abstract class DTO_SourceData_Damage {
    id?: number;
    diceCount: number;
    diceType: string;
    damageType: DTO_SourceData_DamageType;
}