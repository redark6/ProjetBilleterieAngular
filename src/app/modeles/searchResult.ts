import {Event} from '../modeles/event';
export class SearchResult{

  public searched: string;
  public dataList: Event[];
  public currentPage: number;
  public numberOfPages: number;

  constructor(searched: string, dataList: Event[], currentPage: number, numberOfPages: number) {
    this.searched = searched;
    this.dataList = dataList;
    this.currentPage = currentPage;
    this.numberOfPages = numberOfPages;
  }
}
