import { DTO_SourceData_Modifier } from './dto_sourcedata_modifier';

export class DTO_SourceData_Modifier_Defense_Add extends DTO_SourceData_Modifier {
    type: string;
    damageTypeId: string;

    // Set discriminator to allow API to recognize derived type
    discriminator = 1;
}