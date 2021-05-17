import { Ability } from "./ability";
import { AttackDamage } from "./attackdamage";

export abstract class Attack extends Ability {
    attackmodifier: number;
    damageModifier: number;
    damage: AttackDamage[];
}