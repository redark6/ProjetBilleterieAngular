export class EventTicket {

    public id: number;
    public titre: string;
    public type: string;
    public description: string;
    public region: string;
    public date: Date;
    public prix: number;
    public nmbTicket: number;

    constructor(titre: string, type: string, description: string, region: string, date: Date, prix: number, nmbTicket: number) {
        this.titre = titre;
        this.type = type;
        this.description = description;
        this.region = region;
        this.date = date;
        this.prix = prix;
        this.nmbTicket = nmbTicket;
    }


}
