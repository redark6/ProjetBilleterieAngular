export class EventComment {

  public id: number;
  public author: string;
  public userName: string;
  public avatar: string;
  public creationDateHours: Date;
  public parentComment: number;
  public eventId: number;
  public comment: string;
  public lastModification: Date;
  public blocked: boolean;
  public isOwnedByCurrentUser: boolean;
  public commentChildren: EventComment[];
  public numberOfLike: number;
  public numberOfDislike: number;
  public isLikeOrDislikeByUser: number;
  public isReportedByUser: boolean;



  constructor(id: number, author: string, userName: string, avatar: string, creationDateHours: Date, parentComment: number, eventId: number, comment: string,
              lastModification: Date, isBlocked: boolean, isOwnedByCurrentUser: boolean, commentChildren: EventComment[], numberOfLike: number,
              numberOfDislike: number, isLikeOrDislikeByUser: number, isReportedByUser: boolean) {
    this.id = id;
    this.author = author;
    this.userName = userName;
    this.avatar = avatar;
    this.creationDateHours = creationDateHours;
    this.parentComment = parentComment;
    this.eventId = eventId;
    this.comment = comment ;
    this.lastModification = lastModification;
    this.blocked = isBlocked;
    this.isOwnedByCurrentUser = isOwnedByCurrentUser;
    this.commentChildren = commentChildren;
    this.numberOfLike = numberOfLike ;
    this.numberOfDislike = numberOfDislike;
    this.isLikeOrDislikeByUser = isLikeOrDislikeByUser;
    this.isReportedByUser = isReportedByUser;
  }
}
