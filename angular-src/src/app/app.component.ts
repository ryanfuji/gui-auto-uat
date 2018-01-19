import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationStateService } from './services/navigation-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private router: Router,
    private navigationStateService: NavigationStateService){

  }

  ngOnInit(){

  }

}
