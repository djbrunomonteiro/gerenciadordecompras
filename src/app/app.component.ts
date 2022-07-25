import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserActionTypes } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.auth.checkAuthenticated();
    
    
  }


}
