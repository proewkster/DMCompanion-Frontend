import { Modifier } from "./modifier";
import { Spell } from "./spell";

export class Modifier_Spell_Add extends Modifier {
    castingLevel: number;
    spellList: string;
    spellCastingAbility: string;
    spellId: string;
    spell: Spell;
}