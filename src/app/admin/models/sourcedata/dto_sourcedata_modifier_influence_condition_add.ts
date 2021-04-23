import { DTO_SourceData_Modifier_Influence } from './dto_sourcedata_modifier_influence';

export class DTO_SourceData_Modifier_Influence_Condition_Add extends DTO_SourceData_Modifier_Influence {
    conditionId: string;

    // Set discriminator to allow API to recognize derived type
    discriminator = 3;
}