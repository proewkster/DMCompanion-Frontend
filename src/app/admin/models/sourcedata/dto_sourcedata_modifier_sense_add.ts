import { DTO_SourceData_Modifier } from './dto_sourcedata_modifier';

export class DTO_SourceData_Modifier_Sense_Add extends DTO_SourceData_Modifier {
    value: number;
    senseId: string;

    // Set discriminator to allow API to recognize derived type
    discriminator = 7;
}