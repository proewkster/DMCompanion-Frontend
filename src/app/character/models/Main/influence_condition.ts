import { Condition } from './condition';
import { Influence } from "./influence";

export class Influence_Condition extends Influence {
    conditionId: string;
    condition: Condition;
}