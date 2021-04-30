import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../services/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private eventService: EventService) { }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      nbOfTicket: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])],
      category: ['', Validators.compose([
        Validators.required
      ])],
      region: ['', Validators.compose([
        Validators.required
      ])],
      startDate: ['', Validators.compose([
        Validators.required
      ])],
      endDate: ['', Validators.compose([
        Validators.required
      ])],
      price: ['', Validators.compose([
        Validators.required,
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200)
      ])],
    });
  }

  addEvent(): void{
    this.sanitizeDate('startDate');
    this.sanitizeDate('endDate');
    this.eventService.createEvent(this.eventForm.value);
  }

  sanitizeDate(inputForm): void {
    if (this.eventForm.get(inputForm).value) {
      const date = new Date(this.eventForm.get(inputForm).value);
      date.setHours(1);
      const convertDate = date.toISOString().substring(0, 10);
      this.eventForm.get(inputForm).setValue(convertDate, {onlyself: true});
    }
  }

}
