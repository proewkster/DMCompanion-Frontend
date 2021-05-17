export class Skill {
    id: string;
    name: string;
    description: string;
    sourceId: string;
    baseValue: number;
    valueModifier: number;
    valueOverride?: number;
    currentValue: number;
    proficient: boolean;
    expert: boolean;
    proficiencyBonus: number;
}