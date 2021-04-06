export abstract class DTO_SourceData_BaseData {
    id?: string;
    name: string;
    description: string;
    sourceId: string;
    discriminator: number;
}