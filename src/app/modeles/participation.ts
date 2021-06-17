export class Participation{

  private _id: number;
  private _eventId: number;
  private _userId: string;
  private _boughtticket: number;


  constructor(id: number, eventId: number, userId: string, boughtticket: number) {
    this._id = id;
    this._eventId = eventId;
    this._userId = userId;
    this._boughtticket = boughtticket;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get eventId(): number {
    return this._eventId;
  }

  set eventId(value: number) {
    this._eventId = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get boughtticket(): number {
    return this._boughtticket;
  }

  set boughtticket(value: number) {
    this._boughtticket = value;
  }
}
