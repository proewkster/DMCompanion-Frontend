import { Branching_Modifier } from './branching_modifier';
import { Branching_Feat } from './branching_feat';
import { Branching_Choice } from "./branching_choice";
import { BranchingChoiceTypes } from 'src/app/enums/branching-choice-type.enum';

export class Branching_Choice_Feat_Modifiers extends Branching_Choice<Branching_Feat, Branching_Modifier> {
    discriminator = BranchingChoiceTypes.FEAT_MODIFIERS;
}