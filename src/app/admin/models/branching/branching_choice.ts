import { BranchingChoiceTypes } from "src/app/enums/branching-choice-type.enum";

export class Branching_Choice<T,U> {
    id?: number;
    level: number;
    parentId: string;
    discriminator: BranchingChoiceTypes;

    parent?: T;
    options?: U[] = [];

    isValid: boolean;
}