import { DTO_SourceData_Modifier } from './dto_sourcedata_modifier';

export class DTO_SourceData_Modifier_Proficiency_Add extends DTO_SourceData_Modifier {
    proficiencyId: string;

    // Set discriminator to allow API to recognize derived type
    discriminator = 6;
}