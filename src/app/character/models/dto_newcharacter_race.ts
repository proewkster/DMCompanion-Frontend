import { DTO_NewCharacter_Ability } from "./dto_newcharacter_ability";
import { DTO_NewCharacter_Feat } from "./dto_newcharacter_feat";

export class DTO_NewCharacter_Race {
    id: string;

    feats: DTO_NewCharacter_Feat[] = [];
    abilities: DTO_NewCharacter_Ability[] = [];

    constructor(id: string) {
        this.id = id;
    }
}