import { Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { NavigationStateService } from '../../services/navigation-state.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private navigationStateService: NavigationStateService) {

  }

  ngOnInit() {
    feather.replace();
  }

}
