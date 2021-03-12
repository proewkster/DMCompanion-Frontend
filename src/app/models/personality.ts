import { PersonalityType } from "../enums/personality-type.enum";
export class Personality {
    public type: PersonalityType;
    public name: string;
    public description: string;
    public id?: string;


  constructor(
    type: PersonalityType, 
    name: string, 
    description: string,
    id?: string
) {
    this.type = type
    this.name = name
    this.description = description
    this.id = id
  }


}
