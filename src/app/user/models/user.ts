export class User {
    public id: string;
    public email: string;
    public nickname: string;
    public firstName: string;
    public lastName: string;
    public picture: string;
    public newsLetter: boolean;

    constructor(
        id: string,
        email: string,
        nickname: string,
        firstName: string,
        lastName: string,
        picture: string,
        newsLetter: boolean
    ) {
        this.id = id
        this.email = email
        this.nickname = nickname
        this.firstName = firstName
        this.lastName = lastName
        this.picture = picture
        this.newsLetter = newsLetter
    }

}
