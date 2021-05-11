import { Branching_Ability } from "./branching_ability";
import { Branching_Choice_CastSpell_Spells } from "./branching_choice_castspell_spells";

export class Branching_CastSpell extends Branching_Ability {
    castingLevel: number;

    spells: Branching_Choice_CastSpell_Spells[];
}