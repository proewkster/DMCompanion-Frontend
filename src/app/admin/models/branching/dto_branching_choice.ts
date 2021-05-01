export abstract class DTO_Branching_Choice<T,U> {
    id?: number;
    level: number;
    parentId: string;

    parent: T;
    options: U[];
}