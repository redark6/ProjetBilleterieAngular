export class EventTicket {

    public id: number;
    public titre: string;
    public type: string;
    public description: string;
    public region: string;
    public date: Date;
    public prix: number;
    public nmbTicket: number;

  constructor(id: number, titre: string, type: string, description: string, region: string, date: Date, prix: number, nmbTicket: number) {
        this.id = id;
        this.titre = titre;
        this.type = type;
        this.description = description;
        this.region = region;
        this.date = date;
        this.prix = prix;
        this.nmbTicket = nmbTicket;
    }


}
