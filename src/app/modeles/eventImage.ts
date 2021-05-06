export class EventImage{

   private _id: number;
   private _eventid: number;
   private _image: any;


  constructor(id: number, eventid: number, image: any) {
    this._id = id;
    this._eventid = eventid;
    this._image = image;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get eventid(): number {
    return this._eventid;
  }

  set eventid(value: number) {
    this._eventid = value;
  }

  get image(): any {
    return this._image;
  }

  set image(value: any) {
    this._image = value;
  }
}
