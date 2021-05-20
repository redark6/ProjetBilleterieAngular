import {Event} from '../modeles/event';

export class SearchResult{

  public searched: string;
  public numberFound: number;
  public eventList: Event[];
  public currentPage: number;
  public numberOfPages: number;

}
