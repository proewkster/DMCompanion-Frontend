import { Branching_Feat } from './branching_feat';
import { Branching_Race } from './branching_race';
import { Branching_Choice } from "./branching_choice";
import { BranchingChoiceTypes } from 'src/app/enums/branching-choice-type.enum';

export class Branching_Choice_Race_Feats extends Branching_Choice<Branching_Race, Branching_Feat> {
    discriminator = BranchingChoiceTypes.RACE_FEATS;
}