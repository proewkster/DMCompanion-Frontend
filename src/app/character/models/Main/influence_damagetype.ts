import { DamageType } from "./damagetype";
import { Influence } from "./influence";

export class Influence_DamageType extends Influence {
    damageTypeId: string;
    damageType: DamageType;
}