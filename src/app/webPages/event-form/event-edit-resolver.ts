import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Event} from '../../modeles/event';
import {Observable} from 'rxjs';
import {EventService} from '../../services/event.service';

@Injectable({ providedIn: 'root' })
export class EventEditResolver implements Resolve<Event> {
  constructor(private eventService: EventService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Event> | Promise<Event> | Event {
    return this.eventService.get(parseInt(route.paramMap.get('id'), 10));
  }
}
