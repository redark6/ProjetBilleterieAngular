export class User {

    public id: number;
    public firstName: string;
    public lastName: string;
    public birthDate: Date;
    public userName: string;
    public email: string;
    public createdDate: Date;

    constructor(firstName: string, lastName: string, birthDate: Date, userName: string, email: string, createdDate: Date) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.userName = userName;
    this.email = email;
    this.createdDate = createdDate;

  }
}
