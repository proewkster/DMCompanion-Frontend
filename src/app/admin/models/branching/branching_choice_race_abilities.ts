import { Branching_Race } from './branching_race';
import { Branching_Choice } from "./branching_choice";
import { Branching_Ability } from './branching_ability';
import { BranchingChoiceTypes } from 'src/app/enums/branching-choice-type.enum';

export class Branching_Choice_Race_Abilities extends Branching_Choice<Branching_Race, Branching_Ability> {
    discriminator = BranchingChoiceTypes.RACE_ABILITIES;
}