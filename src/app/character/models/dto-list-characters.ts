import { DtoNewRace } from "./dto-new-race";

export class DtoListCharacters {
    public id: string;
    public name: string;
    public level: number;
    public picture: string;
    public races: DtoNewRace[] = [];

}
