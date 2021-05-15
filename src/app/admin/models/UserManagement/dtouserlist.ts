export class DTOUserlist {
    public id: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public isAdmin: boolean;

    constructor(
        id: string,
        email: string,
        firstName: string,
        lastName: string,
        isAdmin: boolean
    ) {
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.isAdmin = isAdmin
    }

}
