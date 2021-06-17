import {CustomeEventDescription} from './custome-event-description';

export class Event {

    public id: number;
    public title: string;
    public category: number;
    public description: string;
    public region: number;
    public creationDate: Date;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public nbOfTicket: number;
    public customeDescription: CustomeEventDescription[];
    public userId: string;

  constructor(id: number, title: string, category: number, description: string, region: number, creationDate: Date, startDate: Date,
              endDate: Date, price: number, nbOfTicket: number, customeDescription: CustomeEventDescription[], userId: string) {

        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.region = region;
        this.creationDate = creationDate;
        this.startDate = startDate ;
        this.endDate = endDate;
        this.price = price;
        this.nbOfTicket = nbOfTicket;
        this.customeDescription = customeDescription;
        this.userId = userId;
    }
}

