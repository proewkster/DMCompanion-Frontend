import { DTO_SourceData_Ability } from './dto_sourcedata_ability';
import { SourceData_AttackDamage } from './sourcedata_attackdamage';

export class DTO_SourceData_Attack extends DTO_SourceData_Ability {
    damage?: SourceData_AttackDamage[];
}