export class DtoUpdatePassword {
    public id: string;
    public oldPassword: string;
    public newPassword: string;

    constructor(id: string, oldPassword: string, newPassword: string) {
        this.id = id
        this.oldPassword = oldPassword
        this.newPassword = newPassword
    }

}
