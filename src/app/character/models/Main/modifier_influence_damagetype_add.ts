import { DamageType } from "./damagetype";
import { Modifier_Influence } from "./modifier_influence";

export class Modifier_Influence_DamageType_Add extends Modifier_Influence {
    damageTypeId: string;
    damageType: DamageType;
}