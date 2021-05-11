import { BranchingChoiceTypes } from "src/app/enums/branching-choice-type.enum";
import { Branching_CastSpell } from "./branching_castspell";
import { Branching_Choice } from "./branching_choice";
import { Branching_Spell } from "./branching_spell";

export class Branching_Choice_CastSpell_Spells extends Branching_Choice<Branching_CastSpell, Branching_Spell> {
    discriminator = BranchingChoiceTypes.CASTSPELL_SPELLS;
}