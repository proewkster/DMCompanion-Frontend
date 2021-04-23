import { DTO_SourceData_Modifier_Influence } from './dto_sourcedata_modifier_influence';

export class DTO_SourceData_Modifier_Influence_DamageType_Add extends DTO_SourceData_Modifier_Influence {
    damageTypeId: string;

    // Set discriminator to allow API to recognize derived type
    discriminator = 5;
}