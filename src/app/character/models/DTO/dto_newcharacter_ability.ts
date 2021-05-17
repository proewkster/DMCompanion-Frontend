import { DTO_NewCharacter_Modifier } from "./dto_newcharacter-modifier";
import { DTO_NewCharacter_Spell } from "./dto_newcharacter_spell";

export class DTO_NewCharacter_Ability {
    id: string;
    level: number;
    parentId?: string;
    rootId: string;

    modifiers: DTO_NewCharacter_Modifier[] = [];
    spells: DTO_NewCharacter_Spell[] = [];

    constructor(id: string, level:number, rootId: string, parentId?: string) {
        this.id = id;
        this.level = level;
        this.parentId = parentId;
        this.rootId = rootId;
    }
}