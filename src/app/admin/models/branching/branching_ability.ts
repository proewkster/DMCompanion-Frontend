import { Branching_Choice_Ability_Modifiers } from './branching_choice_abitlity_modifiers';

export class Branching_Ability {
    id: string;
    name: string;
    descripition: string;
    type: string;
    maxSlots: number

    modifiers: Branching_Choice_Ability_Modifiers[];
}