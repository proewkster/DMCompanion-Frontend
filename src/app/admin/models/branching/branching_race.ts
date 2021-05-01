import { identifierModuleUrl } from "@angular/compiler"
import { Branching_Choice_Race_Abilities } from "./branching_choice_race_abilities";
import { Branching_Choice_Race_Feats } from "./branching_choice_race_feats";

export class Branching_Race {
    id: string;
    name: string;

    feats: Branching_Choice_Race_Feats[];
    abilities: Branching_Choice_Race_Abilities[];
}