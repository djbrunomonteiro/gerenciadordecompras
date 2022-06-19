import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActionTypes } from 'src/app/store/user/user.actions';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit() {
  }

  loginGoogle() {

    this.authService.loginGoogle().then((res: any) => {
        if (!res.uid) {return;}
        const data: IUser = {
          id: res.uid,
          nome: res.displayName,
          email: res.email,
          foto: res.photoURL
        }
        this.store.dispatch(UserActionTypes.UserSetData({user: data}));
        this.router.navigate(['/'])
      })
      .catch(err => console.error(err))

  }

}
