import { DTO_SourceData_Modifier } from './dto_sourcedata_modifier';

export class DTO_SourceData_Modifier_Skill_Proficient extends DTO_SourceData_Modifier {
    skillId: string;

    // Set discriminator to allow API to recognize derived type
    discriminator = 8;
}