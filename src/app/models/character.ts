import { Alignment } from "../enums/alignment.enum";
import { Gender } from "../enums/gender.enum";
import { Size } from "../enums/size.enum";
import { AbilityScore } from "./ability-score";
import { Race } from "./race";

export class Character {

  public name: string; //1
  public level: number;//1
  public picture: string;//1
  public alignment: Alignment;//3
  public gender: Gender;//2
  public eye_Color: string;//2
  public height: number;//2
  public size: Size;//2
  public faith: string;//3
  public hair_Color: string;//2
  public skin_Color: string;//2
  public age: number;//2
  public weight: number;//2
  public appearance: string;//2
  public backstory: string;//4
  public notes: string;//3
  public abilityScores: AbilityScore[];
  public races: Race[];



  constructor(
    name: string,
    level: number,
    picture: string,
    alignment: Alignment,
    gender: Gender,
    eye_Color: string,
    height: number,
    size: Size,
    faith: string,
    hair_Color: string,
    skin_Color: string,
    age: number,
    weight: number,
    appearance: string,
    backstory: string,
    notes: string,
    abilityScores: AbilityScore[],
    races: Race[]
  ) {
    this.name = name
    this.level = level
    this.picture = picture
    this.alignment = alignment
    this.gender = gender
    this.eye_Color = eye_Color
    this.height = height
    this.size = size
    this.faith = faith
    this.hair_Color = hair_Color
    this.skin_Color = skin_Color
    this.age = age
    this.weight = weight
    this.appearance = appearance
    this.backstory = backstory
    this.notes = notes
    this.abilityScores = abilityScores
    this.races = races
  }

}
