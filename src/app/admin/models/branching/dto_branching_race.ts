import { DTO_Branching_Choice_Race_Abilities } from './dto_branching_choice_race_abilities';
import { DTO_Branching_Choice_Race_Feats } from './dto_branching_choice_race_feats';

export class DTO_Branching_Race {
    id: string;

    feats: DTO_Branching_Choice_Race_Feats[];
    abilities: DTO_Branching_Choice_Race_Abilities[];
}