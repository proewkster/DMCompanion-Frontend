import { Modifier } from "./modifier";
import { Sense } from "./sense";

export class Modifier_Sense_Add extends Modifier {
    value: number;
    senseId: string;
    sense: Sense;
}