import { Condition } from './condition';
import { Modifier_Influence } from './modifier_influence';

export class Modifier_Influence_Condition_Add extends Modifier_Influence {
    conditionId: string;
    condition: Condition;
}