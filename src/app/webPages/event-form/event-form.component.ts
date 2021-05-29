import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../services/event.service';
import {Router} from '@angular/router';
import {CommonDataService} from '../../services/common-data.service';
import {Region} from '../../modeles/region';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;
  imageURL: any;
  public imagePath: any;
  regionList: Region[];



  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router, private commondata: CommonDataService) { }

  ngOnInit(): void {

    this.commondata.getRegions().subscribe(value => {
      this.regionList = value;
    }, error => {

    });

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

  addEvent(imageURL: any): void{
    this.sanitizeDate('startDate');
    this.sanitizeDate('endDate');
    this.eventService.createEvent(this.eventForm.value).subscribe((data) => {
        this.router.navigate(['home']);
        this.addImage(this.imagePath.target.files[0], data.id);
      },
    );

  }

  addImage(imageURL: any, id: number): void{
    const form = new FormData();
    form.append('imageFile', imageURL);
    form.append('eventId', id.toString());
    // const eventImage =  new EventImage(1, id , imageURL);
    // console.log(imageURL);
    this.eventService.sendImage(form);
  }

  sanitizeDate(inputForm): void {
    if (this.eventForm.get(inputForm).value) {
      const date = new Date(this.eventForm.get(inputForm).value);
      date.setHours(1);
      const convertDate = date.toISOString().substring(0, 10);
      this.eventForm.get(inputForm).setValue(convertDate, {onlyself: true});
    }
  }

  callInput(): void {
    document.getElementById('EventPictureInput').click();
  }

  onImageChange(files): void {
    const reader = new FileReader();
    this.imagePath = files;
    if (files.target.files[0]) {
      reader.readAsDataURL(files.target.files[0]);
    }
    reader.onload = (_event) => {
      this.imageURL = reader.result;
    };
  }



}
