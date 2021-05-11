import { BranchingChoiceTypes } from "src/app/enums/branching-choice-type.enum";
import { Branching_Ability } from "./branching_ability";
import { Branching_Choice } from "./branching_choice";
import { Branching_Feat } from "./branching_feat";

export class Branching_Choice_Feat_Abilities extends Branching_Choice<Branching_Feat, Branching_Ability> {
    discriminator = BranchingChoiceTypes.FEAT_ABILITIES;
}