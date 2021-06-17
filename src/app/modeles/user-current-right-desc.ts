export class UserCurrentRightDesc {

  private _id: number;
  private _userId: string;
  private _eventId: number;
  private _canCreate: boolean;
  private _eventName: string;


  constructor(id: number, userId: string, eventId: number, canCreate: boolean, eventName: string) {
    this._id = id;
    this._userId = userId;
    this._eventId = eventId;
    this._canCreate = canCreate;
    this._eventName = eventName;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get eventId(): number {
    return this._eventId;
  }

  set eventId(value: number) {
    this._eventId = value;
  }

  get canCreate(): boolean {
    return this._canCreate;
  }

  set canCreate(value: boolean) {
    this._canCreate = value;
  }

  get eventName(): string {
    return this._eventName;
  }

  set eventName(value: string) {
    this._eventName = value;
  }
}
