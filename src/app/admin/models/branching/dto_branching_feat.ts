import { DTO_Branching_Choice_Feat_Modifiers } from './dto_branching_choice_feat_modifiers';
import { DTO_Branching_Choice_Feat_SubFeats } from './dto_branching_choice_feat_subfeats';
import { DTO_Branching_Choice_Feat_Abilities } from './dto_branching_choice_feat_abilities';

export class DTO_Branching_Feat {
    id: string;

    abilities: DTO_Branching_Choice_Feat_Abilities[];
    subfeats: DTO_Branching_Choice_Feat_SubFeats[];
    modifiers: DTO_Branching_Choice_Feat_Modifiers[];
}