import { Branching_Choice_Feat_Abilities } from "./branching_choice_feat_abilities";
import { Branching_Choice_Feat_Modifiers } from "./branching_choice_feat_modifiers";
import { Branching_Choice_Feat_SubFeats } from "./branching_choice_feat_subfeats";

export class Branching_Feat {
    id: string;
    name: string;
    description: string;
    type: string;

    abilities: Branching_Choice_Feat_Abilities[];
    subFeats: Branching_Choice_Feat_SubFeats[];
    modifiers: Branching_Choice_Feat_Modifiers[];
}