import { Alignment } from "../enums/alignment.enum";
import { Gender } from "../enums/gender.enum";
import { Size } from "../enums/size.enum";

export class Character {

    public name: string; //1
    public level: number;//1
    public picture: string;//1
    public inspiration: boolean;//N
    public initiative: number;//N
    public proficiency_Bonus: number;//N
    public armor_Class: number;//N
    public exhaustion_Level: number;//N
    public current_Carrying_Weight: number;//N
    public max_Carrying_Weight: number;//N
    public current_Hit_Points: number;//N
    public max_Hit_Points: number;//N
    public temp_Hit_Points: number;//nergens
    public xp: number;//nergens
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
    public death_Saving_Throw_Success: number;//nergens
    public death_Saving_Throw_Failure: number;//nergens

    constructor(
        name: string,
        level: number,
        picture: string,
        inspiration: boolean,
        initiative: number,
        proficiency_Bonus: number,
        armor_Class: number,
        exhaustion_Level: number,
        current_Carrying_Weight: number,
        max_Carrying_Weight: number,
        current_Hit_Points: number,
        max_Hit_Points: number,
        temp_Hit_Points: number,
        xp: number,
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
        death_Saving_Throw_Success: number,
        death_Saving_Throw_Failure: number
    ) {
        this.name = name
        this.level = level
        this.picture = picture
        this.inspiration = inspiration
        this.initiative = initiative
        this.proficiency_Bonus = proficiency_Bonus
        this.armor_Class = armor_Class
        this.exhaustion_Level = exhaustion_Level
        this.current_Carrying_Weight = current_Carrying_Weight
        this.max_Carrying_Weight = max_Carrying_Weight
        this.current_Hit_Points = current_Hit_Points
        this.max_Hit_Points = max_Hit_Points
        this.temp_Hit_Points = temp_Hit_Points
        this.xp = xp
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
        this.death_Saving_Throw_Success = death_Saving_Throw_Success
        this.death_Saving_Throw_Failure = death_Saving_Throw_Failure
    }

}
