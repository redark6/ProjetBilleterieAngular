import {Input} from '@angular/core';

export class Organiser {

  private _jobTitle: string;
  private _phoneNumber: string;
  private _website: string;
  private _company: string;
  private _blog: string;
  private _proAddress: string;
  private _proCity: string;
  private _proCountry: string;

  // tslint:disable-next-line:variable-name max-line-length
  constructor(job_title: string, phone_number: string, website: string, company: string, blog: string, pro_address: string, pro_city: string, pro_country: string) {
    this._jobTitle = job_title;
    this._phoneNumber = phone_number;
    this._website = website;
    this._company = company;
    this._blog = blog;
    this._proAddress = pro_address;
    this._proCity = pro_city;
    this._proCountry = pro_country;
  }

  get jobTitle(): string {
    return this._jobTitle;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  get website(): string {
    return this._website;
  }

  get company(): string {
    return this._company;
  }

  get blog(): string {
    return this._blog;
  }

  get proAddress(): string {
    return this._proAddress;
  }

  get proCity(): string {
    return this._proCity;
  }

  get proCountry(): string {
    return this._proCountry;
  }
}
