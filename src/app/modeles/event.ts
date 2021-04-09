export class Event {

    public id: number;
    public title: string;
    public category: number;
    public description: string;
    public region: string;
    public creationDate: Date;
    public startDate: Date;
    public endDate: Date;
    public price: number;
    public nbOfTicket: number;

  constructor(id: number, title: string, category: number, description: string, region: string, creationDate: Date, startDate: Date, endDate: Date, price: number, nbOfTicket: number) {
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
    }
}

