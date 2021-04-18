import { DTO_SourceData_Modifier } from './dto_sourcedata_modifier';

export class DTO_SourceData_Modifier_AbilityScore_Change extends DTO_SourceData_Modifier{
    value: number;
    abilityScoreId: string;
    
    // Set discriminator to allow API to recognize derived type
    discriminator = 0;
}