import {Component, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../modeles/event';
import {EventService} from '../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Rating} from '../../modeles/rating';
import {User} from '../../modeles/user';
import {UserService} from '../../services/user.service';
import {GlobalParameter} from '../../specialClass/global-parameter';
import {} from 'google.maps';
import {EventImage} from '../../modeles/eventImage';
import {MapService} from '../../services/map.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public event: Event;
  public value: number;
  public value2: number;
  public rating: Rating;
  public eventId: number;
  public userProfilInfos: User;
  public region: string;
  public eventImage: any;
  public eventImageByte: string;
  public urlTweet: string;

  isAuthenticate: boolean;
  isOwner = false;

  categories: string[] = [
    'none',
    'Cour et Atelier', 'Festival', 'Salon', 'Action solidaire', 'Concert',
    'Gastronomie', 'Conférence et Forum', 'Musée et Exposition', 'Spectacle et Théâtre',
    'Autres'];

  constructor(private user: UserService, private eventService: EventService, private activatedRoute: ActivatedRoute, private globalVar: GlobalParameter, private router: Router , private mapService: MapService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe((data: { event: Event }) => this.event = data.event);

    this.eventService.isOwner(this.event.id).subscribe(value1 => {
      this.isOwner = value1;
    });

    this.user.authListener().subscribe(state => {
      this.isAuthenticate = state;
    });

    const observer = new IntersectionObserver( (entries) => {
      if (entries[0].isIntersecting === true){
        document.getElementById('pricebar').classList.add('hide');
      }
      else{
        document.getElementById('pricebar').classList.remove('hide');
      }
    }, { threshold: [0] });

    observer.observe(document.querySelector('#comments'));

    this.urlTweet = 'http://alpha.csid.agilitejoviale.fr' + this.router.url;

    this.region = this.globalVar.regionList[this.event.region - 1].regionName;

    this.eventId = this.activatedRoute.snapshot.params.id;

    this.eventService.getRating(this.activatedRoute.snapshot.params.id).subscribe(value => {
      console.log(value);
      if (value === null || value === undefined){
        this.value = 0;
      }
      else{
        this.value = value;
      }
    });

    this.user.getUserProfil().subscribe(user => {
      this.userProfilInfos = user;
    });

    this.eventService.getUserRating(this.activatedRoute.snapshot.params.id).subscribe(value2 => {
      if (value2 === null){
        this.value2 = 0;
      }
      else{
        this.value2 = value2;
      }
    });

    console.log('AVANT CALL');
    this.eventService.getImage(this.eventId).subscribe((image) => {
      console.log('a linterieur');
      this.eventImage = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + image);
    });

    let map: google.maps.Map;
    const center: google.maps.LatLngLiteral = {lat: 30, lng: -110};

    this.mapService.getmap(this.region).subscribe(value1 => {
      console.log(value1);
      console.log('succes');
      if (value1.length > 0){
        initMapSucces(value1[0]);
      }
    }, error => {
      console.log('fail');
      console.log(error);
      initMapError();
    });

    function initMapSucces(mapcontent: any): void {
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
        center: { lat: Number(mapcontent.lat), lng: Number(mapcontent.lon) },
        mapTypeId: 'terrain',
        restriction: {
          latLngBounds: regionBounds,
          strictBounds: false,
        },

      });
      const regionCoords = [];
      // Define the LatLng coordinates for the polygon's path.
      if ( mapcontent.geojson.type === 'Polygon'){
        mapcontent.geojson.coordinates.forEach((value) => {
          value.forEach( (value2) => {
            regionCoords.push({lat: Number(value2[1]), lng: Number(value2[0])});
          });
        });
      }
      else if (mapcontent.geojson.type === 'MultiPolygon'){
        let item = 0;
        mapcontent.geojson.coordinates.forEach((value) => {
          value.forEach( (value2) => {
            regionCoords[item] = [];
            value2.forEach( (value3) => {
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

    function initMapError(): void {
      console.log('failur');

      const mapy = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: { lat: 24.886, lng: -70.268 },
        mapTypeId: 'terrain',
      });
      // Define the LatLng coordinates for the polygon's path.
      const triangleCoords = [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 },
        { lat: 25.774, lng: -80.19 },
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

  }

  rate(): void{
    this.rating = new Rating(this.activatedRoute.snapshot.params.id, this.userProfilInfos.email, this.value2);
    this.eventService.rate(this.rating);
    this.event = this.activatedRoute.snapshot.data.event;
  }

  gotomap(): void {
    document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
