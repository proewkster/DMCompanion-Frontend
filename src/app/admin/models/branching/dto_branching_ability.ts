import { DTO_Branching_Choice_Ability_Modifiers } from './dto_branching_choice_ability_modifiers';
import { DTO_Branching_Choice_CastSpell_Spells } from './dto_branching_choice_castspell_spells';

export class DTO_Branching_Ability {
    id: string;

    modifiers: DTO_Branching_Choice_Ability_Modifiers[];
    spells: DTO_Branching_Choice_CastSpell_Spells[];
}