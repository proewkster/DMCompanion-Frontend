import { DamageType } from "./damagetype";
import { Modifier } from "./modifier";

export class Modifier_Defense_Add extends Modifier {
    type: string;
    damageTypeId: string;
    damageType: DamageType;
}