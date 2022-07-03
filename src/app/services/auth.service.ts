import { IUser } from './../models/user';
import { UserActionTypes } from './../store/user/user.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authGet: any;
  isAuthenticated: boolean = false;
  user = null

  constructor(
    private afs: Firestore,
    private auth: Auth,
    private router: Router,
    private store: Store
  ) {
    this.authGet = getAuth();
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize()

    }
  }

  logOut() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  checkAuthenticated() {
    return this.isAuthenticated;
  }

  async signIn(){
    this.user = await GoogleAuth.signIn();
    console.log(this.user);
    
    if(this.user){
      const user: IUser = {
        id: this.user.id,
        nome:this.user.displayName,
        email: this.user.email,
        foto: this.user.imageUrl
      }
      this.store.dispatch(UserActionTypes.UserSetStore({user}));
      this.isAuthenticated = true
      this.checkAuthenticated();
      this.router.navigate(['/'])
    }
    // console.log('user: ', this.user);
    
  }

  loginGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.checkAuthenticated();
        return user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        this.checkAuthenticated();
        return error.message;
        // ...
      });
  }
}
