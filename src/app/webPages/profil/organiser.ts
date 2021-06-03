export class Organiser {

  private jobTitle: string;
  private phoneNumber: string;
  private website: string;
  private company: string;
  private blog: string;
  private proAddress: string;
  private proCity: string;
  private proCountry: string;

  // tslint:disable-next-line:variable-name max-line-length
  constructor(job_title: string, phone_number: string, website: string, company: string, blog: string, pro_address: string, pro_city: string, pro_country: string) {
    this.jobTitle = job_title;
    this.phoneNumber = phone_number;
    this.website = website;
    this.company = company;
    this.blog = blog;
    this.proAddress = pro_address;
    this.proCity = pro_city;
    this.proCountry = pro_country;
  }
}
