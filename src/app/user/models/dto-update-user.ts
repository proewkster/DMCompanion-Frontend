export class DTOUpdateUser {
    public id: string;
    public nickname: string;
    public firstName: string;
    public lastName: string;
    public picture: string;
    public newsletter: boolean;

    constructor(
        id: string,
        nickname: string,
        firstName: string,
        lastName: string,
        picture: string,
        newsletter: boolean
    ) {
        this.id = id
        this.nickname = nickname
        this.firstName = firstName
        this.lastName = lastName
        this.picture = picture
        this.newsletter = newsletter
    }

}
