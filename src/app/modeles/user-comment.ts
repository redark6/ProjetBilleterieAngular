export class UserComment {

  public eventId: number;
  public eventTitle: string;
  public userComment: string;

  constructor(eventId: number, eventTitle: string, userComment: string) {
    this.eventId = eventId;
    this.eventTitle = eventTitle;
    this.userComment = userComment;
  }
}

