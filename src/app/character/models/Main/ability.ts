export class Ability {
    id: string;
    name: string;
    description: string;
    type: string;
    active: boolean;
    available: boolean;
    restoreCondition: string;
    maxSlots: number;
    spentSlots: number;
    sourceId: string;
    parentId: string;
    rootId: string;
    level: number;
}