import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EventService} from '../../../services/event.service';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {SearchResult} from '../../../modeles/searchResult';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  getParamsArray;
  currentUrlParams;
  paramsError = false;
  paramsArray = ['search', 'category', 'date', 'price', 'page'];
  minValue = 0;
  maxValue = 500;
  options: Options = {
    floor: 0,
    ceil: 500,
    step: 10
};
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private route: Router , private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      category: [''],
      startDate: [''],
      endDate: [''],
      minPrice: [''],
      maxPrice: ['']
    });

    this.activatedRoute.queryParamMap.subscribe(urlParams => {
      console.log(urlParams);
      this.currentUrlParams = urlParams;
      let getParamsArray = new HttpParams();

      urlParams.keys.forEach(value => {
        switch (value) {
          case 'search':
            getParamsArray = getParamsArray.set('search', urlParams.get(value));
            break;
          case 'category':
            if (urlParams.get(value)) {  getParamsArray = getParamsArray.set('category', urlParams.get(value)); }
            else { this.paramsError = true; }
            break;
          case 'date':
            let dateObject; dateObject = this.checkAndSetDatesRange(urlParams.get(value));
            if (dateObject.isValid === true) {
              if (dateObject.dates.startDate !== null) { getParamsArray = getParamsArray.set('startDate', dateObject.dates.startDate); }
              if (dateObject.dates.endDate !== null) { getParamsArray = getParamsArray.set('endDate', dateObject.dates.endDate); }
            }
            break;
          case 'price':
            let priceObject: any; priceObject = this.checkAndSetPriceRange(urlParams.get(value));
            if (priceObject.isValid === true) {
              if (priceObject.prices.minPrice !== null) { getParamsArray = getParamsArray.set('minPrice', priceObject.prices.minPrice); }
              if (priceObject.prices.maxPrice !== null) { getParamsArray = getParamsArray.set('maxPrice', priceObject.prices.maxPrice); }
            }
            break;
          case 'page':

            break;
          default:
            this.paramsError = true;
            break;
        }
      });

      this.getParamsArray = getParamsArray;
      this.eventService.searchEvents(this.getParamsArray);


    });

  }

  search(): void{

    if (this.category === ''){this.searchForm.get('category').setValue(null); }
    this.sanitizeDate('startDate');
    this.sanitizeDate('endDate');
    if (this.minValue > this.options.floor){this.searchForm.get('minPrice').setValue(this.minValue); }else{ this.searchForm.get('minPrice').setValue(''); }
    if (this.maxValue < this.options.ceil){this.searchForm.get('maxPrice').setValue(this.maxValue); }else{ this.searchForm.get('maxPrice').setValue(''); }
    const nextUrlParams = this.constructUrlParams();
    if (!(JSON.stringify({ params: nextUrlParams }) === JSON.stringify(this.currentUrlParams))){
      this.route.navigate(['/events'] ,  { queryParams: nextUrlParams} );
    }
  }

  sanitizeDate(inputForm): void {
    if (this.searchForm.get(inputForm).value) {
      const date = new Date(this.searchForm.get(inputForm).value);
      date.setHours(1);
      const convertDate = date.toISOString().substring(0, 10);
      this.searchForm.get(inputForm).setValue(convertDate, {onlyself: true});
    }
  }

  constructUrlParams(): any {
    let urlParams;
    urlParams = {};
    if (this.category) { urlParams.category = this.category;}
    if (this.startDate || this.endDate) { urlParams.date = (this.startDate ? this.startDate : 'start') + '~' + (this.endDate ? this.endDate : 'end'); }
    if (this.minPrice || this.maxPrice) {urlParams.price = (this.minPrice.toString() ? this.minPrice.toString() : 'min') + '~' + (this.maxPrice.toString() ? this.maxPrice.toString() : 'max'); }
    return urlParams;
  }

  checkAndSetPriceRange(prices: string): any{
    const priceRange = prices.split('~');
    const minPrice = parseInt(priceRange[0], 10);
    const maxPrice = parseInt(priceRange[1], 10);
    let priceObject; priceObject = {};
    let subPriceObject; subPriceObject = {};
    priceObject.isValid = false;
    subPriceObject.minPrice = null;
    subPriceObject.maxPrice = null;
    if (!isNaN(minPrice) && this.inRange(minPrice, this.options.floor, this.options.ceil) && minPrice > this.options.floor){
      priceObject.isValid = true; subPriceObject.minPrice = minPrice;
      this.searchForm.get('minPrice').setValue(minPrice); this.minValue = minPrice;
    }
    if (!isNaN(maxPrice) && this.inRange(maxPrice, this.options.floor, this.options.ceil) && maxPrice < this.options.ceil ){
      priceObject.isValid = true; subPriceObject.maxPrice = maxPrice;
      this.searchForm.get('maxPrice').setValue(maxPrice); this.maxValue = maxPrice;
    }
    if (subPriceObject.minPrice != null && subPriceObject.maxPrice != null){
      if (subPriceObject.minPrice > subPriceObject.maxPrice){
        const tempMinPrice = subPriceObject.minPrice;
        subPriceObject.minPrice = subPriceObject.maxPrice;
        subPriceObject.maxPrice = tempMinPrice;
        this.searchForm.get('minPrice').setValue(subPriceObject.minPrice);
        this.searchForm.get('maxPrice').setValue(subPriceObject.maxPrice);
        this.minValue = subPriceObject.minPrice; this.maxValue = subPriceObject.maxPrice;
      }
    }
    priceObject.prices = subPriceObject;
    return priceObject;
  }

  checkAndSetDatesRange(dates: string): any{
    const dateRange = dates.split('~');
    let dateObject; dateObject = {};
    let subDateObject; subDateObject = {};
    dateObject.isValid = false;
    subDateObject.startDate = null;
    subDateObject.endDate = null;
    if (this.isDate(dateRange[0]) ){
      dateObject.isValid = true; subDateObject.startDate = dateRange[0];
      this.searchForm.get('startDate').setValue(subDateObject.startDate);
    }
    if (this.isDate(dateRange[1]) ){
      dateObject.isValid = true; subDateObject.endDate = dateRange[1];
      this.searchForm.get('endDate').setValue(subDateObject.endDate);
    }
    if (subDateObject.startDate != null && subDateObject.endDate != null){
      if (Date.parse(subDateObject.startDate) > Date.parse(subDateObject.endDate)){
        const tempStartDate = subDateObject.startDate;
        subDateObject.startDate = subDateObject.endDate;
        subDateObject.endDate = tempStartDate;
        this.searchForm.get('startDate').setValue(subDateObject.startDate);
        this.searchForm.get('endDate').setValue(subDateObject.endDate);
      }
    }
    dateObject.dates = subDateObject;
    return dateObject;
  }

  inRange(x, min, max): boolean {
    return ((x - min) * (x - max) <= 0);
  }

  isDate(date): boolean {
    if (isNaN(date) && !isNaN(Date.parse(date))){
      return true;
    }
    return false;
  }

  get category(): string {
    return this.searchForm.get('category').value;
  }

  get startDate(): string {
    return this.searchForm.get('startDate').value;
  }

  get endDate(): string {
    return this.searchForm.get('endDate').value;
  }

  get minPrice(): number {
    return this.searchForm.get('minPrice').value;
  }

  get maxPrice(): number {
    return this.searchForm.get('maxPrice').value;
  }

}

