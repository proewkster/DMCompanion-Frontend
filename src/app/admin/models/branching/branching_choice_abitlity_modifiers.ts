import { Branching_Modifier } from './branching_modifier';
import { Branching_Ability } from './branching_ability';
import { Branching_Choice } from './branching_choice';
import { BranchingChoiceTypes } from 'src/app/enums/branching-choice-type.enum';

export class Branching_Choice_Ability_Modifiers extends Branching_Choice<Branching_Ability, Branching_Modifier> {
    discriminator = BranchingChoiceTypes.ABILITY_MODIFIERS;
}