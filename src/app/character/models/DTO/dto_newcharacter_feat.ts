import { DTO_NewCharacter_Modifier } from "./dto_newcharacter-modifier";
import { DTO_NewCharacter_Ability } from "./dto_newcharacter_ability";

export class DTO_NewCharacter_Feat {
    id: string;
    level: number;
    parentId?: string;
    rootId: string;

    subFeats: DTO_NewCharacter_Feat[] = [];
    abilities: DTO_NewCharacter_Ability[] = [];
    modifiers: DTO_NewCharacter_Modifier[] = [];

    constructor(id: string, level: number, rootId: string, parentId?: string) {
        this.id = id;
        this.level = level;
        this.parentId = parentId;
        this.rootId = rootId;
    }
}