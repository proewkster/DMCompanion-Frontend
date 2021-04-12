import { SourceData_DamageType } from './sourcedata_damagetype';

export abstract class SourceData_Damage {
    id?: number;
    diceCount: number;
    diceType: string;
    damageTypeId: string;
    damageType: SourceData_DamageType;
}