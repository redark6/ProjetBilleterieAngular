import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {EventService} from '../../services/event.service';
import {Router} from '@angular/router';
import {CommonDataService} from '../../services/common-data.service';
import {Region} from '../../modeles/region';
import {ImgCropperConfig, ImgCropperErrorEvent, ImgCropperEvent, LyImageCropper} from '@alyle/ui/image-cropper';
import {datecompare, descriptionSize} from '../../specialClass/custom-validator';
import {MapService} from '../../services/map.service';
import {GlobalParameter} from '../../specialClass/global-parameter';
import {CropperDialog} from './cropperdialog/cropper-dialog';
import {LyDialog} from '@alyle/ui/dialog';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFormComponent implements OnInit {

  eventForm: FormGroup;
  imageURL: any;
  public imagePath: any;
  regionList: Region[];

  map: google.maps.Map;
  center: google.maps.LatLngLiteral = {lat: 30, lng: -110};

  categories: string[] = [
    'none',
    'Cour et Atelier', 'Festival', 'Salon', 'Action solidaire', 'Concert',
    'Gastronomie', 'Conférence et Forum', 'Musée et Exposition', 'Spectacle et Théâtre',
    'Autres'];

  minDate = new Date();

  cropped?: string;

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private router: Router, private commondata: CommonDataService, private mapService: MapService, private globalVar: GlobalParameter, private _dialog: LyDialog, private _cd: ChangeDetectorRef) {
  }

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
        Validators.min(1),
        Validators.max(1000),
      ])],
      category: ['', Validators.compose([
        Validators.required
      ])],
      region: ['', Validators.compose([
        Validators.required
      ])],
      startDate: [null, Validators.compose([
        Validators.required,
      ])],
      endDate: [null, Validators.compose([
        Validators.required,
      ])],
      price: ['', Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(500),
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(3000)
      ])],
    }, {validator: datecompare('startDate', 'endDate')});

    this.getmap();

    const observer = new IntersectionObserver((entries) => {
      // isIntersecting is true when element and viewport are overlapping
      // isIntersecting is false when element and viewport don't overlap
      if (entries[0].isIntersecting === true) {
        console.log('Element has just become visible in screen');
        document.getElementById('pricebar').classList.add('hide');
      } else {
        document.getElementById('pricebar').classList.remove('hide');
        console.log('notvisble');
      }
    }, {threshold: [0]});

    observer.observe(document.querySelector('#rate'));
  }

  get title(): AbstractControl {
    return this.eventForm.get('title');
  }

  get nbOfTicket(): AbstractControl {
    return this.eventForm.get('nbOfTicket');
  }

  get category(): AbstractControl {
    return this.eventForm.get('category');
  }

  get region(): AbstractControl {
    return this.eventForm.get('region');
  }

  get startDate(): AbstractControl {
    return this.eventForm.get('startDate');
  }

  get endDate(): AbstractControl {
    return this.eventForm.get('endDate');
  }

  get price(): AbstractControl {
    return this.eventForm.get('price');
  }

  get description(): AbstractControl {
    return this.eventForm.get('description');
  }

  addEvent(imageURL: any): void {
    this.sanitizeDate('startDate');
    this.sanitizeDate('endDate');
    this.eventService.createEvent(this.eventForm.value).subscribe((data) => {
        this.router.navigate(['home']);
        this.addImage( data.id);
      },
    );

  }


  addImage( id: number): void {

    const imageName = 'name.jpg';
    const block = this.cropped.split(';');
    const contentType = block[0].split(':')[1]; // In this case "image/gif"
    const realData = block[1].split(',')[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

    const imageBlob = this.b64toBlob(realData, contentType, 512);
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpg' });

    // const blob = new Blob([this.cropped], {type: 'image/jpeg'});
    // const file = new File([blob], 'imageFileName.jpeg', {type: 'image/jpeg'});
    // const imageURL = this.imagePath.target.files[0];
    // console.log(file);
    // console.log(imageURL);

    const form = new FormData();
    form.append('imageFile', imageFile);
    form.append('eventId', id.toString());
    // const eventImage =  new EventImage(1, id , imageURL);
    // console.log(imageURL);
    this.eventService.sendImage(form);
  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  dataURItoBlob(dataURI): Blob {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  sanitizeDate(inputForm): void {
    if (this.eventForm.get(inputForm).value) {
      const date = new Date(this.eventForm.get(inputForm).value);
      date.setMinutes(Math.abs(date.getTimezoneOffset()));
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


  initMapSucces(mapcontent: any): void {
    console.log('succes');
    console.log(mapcontent);

    const regionBounds = {
      north: Number(mapcontent.boundingbox[0]),
      south: Number(mapcontent.boundingbox[1]),
      west: Number(mapcontent.boundingbox[2]),
      east: Number(mapcontent.boundingbox[3]),
    };

    const mapy = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: Number(mapcontent.lat), lng: Number(mapcontent.lon)},
      mapTypeId: 'terrain',
      restriction: {
        latLngBounds: regionBounds,
        strictBounds: false,
      },

    });
    const regionCoords = [];
    // Define the LatLng coordinates for the polygon's path.
    if (mapcontent.geojson.type === 'Polygon') {
      mapcontent.geojson.coordinates.forEach((value) => {
        value.forEach((value2) => {
          regionCoords.push({lat: Number(value2[1]), lng: Number(value2[0])});
        });
      });
    } else if (mapcontent.geojson.type === 'MultiPolygon') {
      let item = 0;
      mapcontent.geojson.coordinates.forEach((value) => {
        value.forEach((value2) => {
          regionCoords[item] = [];
          value2.forEach((value3) => {
            regionCoords[item].push({lat: Number(value3[1]), lng: Number(value3[0])});
          });
          item++;
        });
      });
    }


    // Construct the polygon.
    const bermudaTriangle = new google.maps.Polygon({
      paths: regionCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    });
    bermudaTriangle.setMap(mapy);
  }

  initMapError(): void {
    console.log('failur');

    const mapy = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {lat: 24.886, lng: -70.268},
      mapTypeId: 'terrain',
    });
    // Define the LatLng coordinates for the polygon's path.
    const triangleCoords = [
      {lat: 25.774, lng: -80.19},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
      {lat: 25.774, lng: -80.19},
    ];
    // Construct the polygon.
    const bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
    });
    bermudaTriangle.setMap(mapy);
  }

  getmap(): void {
    if (this.regionList === undefined || this.regionList[this.region.value].regionName === undefined) {
      this.initMapError();
    } else {
      this.mapService.getmap(this.regionList[this.region.value].regionName).subscribe(value1 => {
        if (value1.length > 0) {
          this.initMapSucces(value1[0]);
        }
      }, error => {
        this.initMapError();
      });
    }
  }

  gotomap(): void {
    document.getElementById('map').scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  openCropperDialog(event: Event): void {
    this.cropped = null!;
    this._dialog.open<CropperDialog, Event>(CropperDialog, {
      data: event,
      width: 320,
      disableClose: true
    }).afterClosed.subscribe((result?: ImgCropperEvent) => {
      if (result) {
        this.cropped = result.dataURL;
        this._cd.markForCheck();
      }
    });
  }

  removepicture(): void {
    this.cropped = null;
  }

  removeHtml(value: string): string{
    if (value != null){
      return value.replace( /(<([^>]+)>)/ig, '');
    }
    return '';
  }
}
