export class Comment {

  public id: number;
  public author: string;
  public avatar: string;
  public creationDateHours: Date;
  public parentComment: number;
  public eventId: number;
  public comment: string;
  public lastModification: Date;
  public isBlocked: boolean;
  public isOwnedByCurrentUser: boolean;
  public commentChildren: Comment[];
  public numberOfLike: number;
  public numberOfDislike: number;
  public isLikeOrDislikeByUser: number;
  public isReportedByUser: boolean;



  constructor(id: number, author: string, avatar: string, creationDateHours: Date, parentComment: number, eventId: number, comment: string,
              lastModification: Date, isBlocked: boolean, isOwnedByCurrentUser: boolean, commentChildren: Comment[], numberOfLike: number,
              numberOfDislike: number, isLikeOrDislikeByUser: number, isReportedByUser: boolean) {
    this.id = id;
    this.author = author;
    this.avatar = avatar;
    this.creationDateHours = creationDateHours;
    this.parentComment = parentComment;
    this.eventId = eventId;
    this.comment = comment ;
    this.lastModification = lastModification;
    this.isBlocked = isBlocked;
    this.isOwnedByCurrentUser = isOwnedByCurrentUser;
    this.commentChildren = commentChildren;
    this.numberOfLike = numberOfLike ;
    this.numberOfDislike = numberOfDislike;
    this.isLikeOrDislikeByUser = isLikeOrDislikeByUser;
    this.isReportedByUser = isReportedByUser;
  }
}
