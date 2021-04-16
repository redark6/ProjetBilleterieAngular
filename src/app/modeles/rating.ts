export class Rating {

  private eventId: number;
  private userId: string;
  private rating: number;

  constructor(eventId: number, userId: string, rating: number) {
    this.eventId = eventId,
    this.userId = userId;
    this.rating = rating;
  }
}
