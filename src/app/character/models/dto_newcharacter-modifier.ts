export class DTO_NewCharacter_Modifier {
    id: string;
    level: number;
    parentId: string;
    rootId: string;

    constructor(id: string, level: number, rootId: string, parentId: string) {
        this.id = id;
        this.level = level
        this.parentId = parentId;
        this.rootId = rootId;
    }
}