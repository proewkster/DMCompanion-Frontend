import { Skill } from "./skill";

export class AbilityScore {
    id: string;
    name: string;
    description: string;
    sourceId: string;
    maxValue: number;
    baseValue: number;
    valueModifier: number;
    valueOverride?: number;
    currentValue: number;
    modifier: number;
    savingThrowModifier: number;
    proficient: boolean;
    expert: boolean;
    proficiencyBonus: number;

    skills: Skill[];
}