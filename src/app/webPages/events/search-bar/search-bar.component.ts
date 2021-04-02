import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {EventService} from '../../../service/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import {HttpParams} from '@angular/common/http';

export interface Fruit {
  name: string;
}

interface ParamsArray{
  params: object;
}


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  paramsArray = ['search', 'category', 'startDate', 'endDate', 'minPrice', 'maxPrice', 'page'];
  requestParams: ParamsArray = {params: {}};
  minValue = 0;
  maxValue = 500;
  options: Options = {
    floor: 0,
    ceil: 500,
    step: 10
};

  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private route: Router , private activatedRoute: ActivatedRoute, private datePipe: DatePipe) {

  }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      category: [''],
      startDate: [''],
      endDate: [''],
      minPrice: [''],
      maxPrice: ['']
    });

    this.activatedRoute.queryParamMap.subscribe((params) => {
      let paramsContent;
      paramsContent = {};
      for (const param of this.paramsArray){
        if (params.has(param)){
          paramsContent[param] = params.get(param);
        }
        else{
          paramsContent[param] = null;
        }
      }
      this.requestParams.params = paramsContent;
      }

    );

    this.eventService.searchEvents(this.requestParams.params);


    this.searchForm.get('minPrice').setValue(this.options.floor);
    this.searchForm.get('maxPrice').setValue(this.options.ceil);

  }

search(): void{

  if (this.category === ''){this.searchForm.get('category').setValue(null); }
  this.sanitizeDate('startDate');
  this.sanitizeDate('endDate');
  this.searchForm.get('minPrice').setValue(this.minValue);
  this.searchForm.get('maxPrice').setValue(this.maxValue);


  this.route.navigate(['/events'] ,  { queryParams: this.constructQueryParam() });


  this.eventService.searchEvents(this.searchForm.value);
}

  sanitizeDate(inputForm): void {
    if (this.searchForm.get(inputForm).value) {
      const date = new Date(this.searchForm.get(inputForm).value);
      date.setHours(1);
      const convertDate = date.toISOString().substring(0, 10);
      this.searchForm.get(inputForm).setValue(convertDate, {
        onlyself: true
      });
    }
    else{
      this.searchForm.get(inputForm).setValue(null);
    }
  }

  constructQueryParam(): any {

    let params;
    params = {};

    if (this.category != null) { params.category = this.category; }
    if (this.startDate != null) { params.begin = this.startDate;  }
    if (this.endDate != null) { params.end = this.endDate; }
    if (this.minPrice !== this.options.floor) { params.minPrice = this.minPrice.toString(); }
    if (this.maxPrice !== this.options.ceil) { params.maxPrice = this.maxPrice.toString(); }

    return params;
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

