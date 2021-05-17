export class DTO_NewCharacter_AbilityScore {
    id: string;
    name: string;
    baseValue: number;

    constructor(id: string, name: string, baseValue: number) {
      this.id = id;
      this.name = name;
      this.baseValue = baseValue;
    }
}
