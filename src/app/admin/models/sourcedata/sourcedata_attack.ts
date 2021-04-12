import { SourceData_Ability } from './sourcedata_ability';
import { SourceData_AttackDamage } from "./sourcedata_attackdamage";

export abstract class SourceData_Attack extends SourceData_Ability {
    damage: SourceData_AttackDamage[]; 
}