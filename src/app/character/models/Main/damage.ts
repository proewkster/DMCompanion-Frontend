import { DamageType } from "./damagetype";

export abstract class Damage {
    diceCount: number;
    diceType: string;
    damageType: DamageType;
}