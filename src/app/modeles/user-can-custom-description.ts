export class UserCanCustomDescription {

  public canAddDescription: boolean;
  public descriptionAlreadyExist: boolean;
  public content: string;

  constructor(canAddDescription: boolean, descriptionAlreadyExist: boolean,content: string) {
    this.canAddDescription = canAddDescription;
    this.descriptionAlreadyExist = descriptionAlreadyExist;
    this.content = content;
  }

}
