import { Component, OnInit } from '@angular/core';
import {GlobalParameter} from '../../specialClass/global-parameter';
import {UserService} from '../../services/user.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  isAuthenticate: boolean;
  authority: string;
  searchForm: FormGroup;

  public isMenuCollapsed = true;
  public isSearchMenuCollapsed = true;


  constructor(private user: UserService, private globalVar: GlobalParameter , private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.user.authListener().subscribe(state => {
      this.isAuthenticate = state;
    });

    this.user.roleListener().subscribe(state =>  {
      this.authority = state;
    });

    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  logout(): void{
    this.user.logout();
  }

  searchEvent(): any{
    this.router.navigate(['events/'], { queryParams: { search: this.searchContentBar.value}});
    this.searchContentBar.setValue('');
  }

  get searchContentBar(): AbstractControl {
    return this.searchForm.get('search');
  }

  collapseMenu(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.isSearchMenuCollapsed = true;
  }

  collapseSearchBar(): void {
    this.isSearchMenuCollapsed = !this.isSearchMenuCollapsed;
    this.isMenuCollapsed = true;
  }

  get currentRoute(): string{
    return this.globalVar.currentRoute;
  }

  hideShowSearchBar(): void {
    const x = document.getElementById('searchevent');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

}
