import { DTO_SourceData_Modifier } from './dto_sourcedata_modifier';

export class DTO_SourceData_Modifier_Spell_Add extends DTO_SourceData_Modifier {
    level: number;
    spellList: string;
    abilityScoreId: string;
    spellId: string;

    // Set discriminator to allow API to recognize derived type
    discriminator = 10;
}