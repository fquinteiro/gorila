import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Output() logOut = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public onLogOut() {
    this.logOut.emit();
  }
}
