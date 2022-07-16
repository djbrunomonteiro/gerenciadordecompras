import { IUser } from './../models/user';
import { UserActionTypes } from './../store/user/user.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { logoutAction } from '../store/logout/logout.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authGet: any;
  isAuthenticated: boolean = false;
  user = null

  constructor(
    private auth: Auth,
    private router: Router,
    private store: Store,
    
  ) {
    this.authGet = getAuth();
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize()

    }
  }

  async checkAuthenticated() {
    new Promise(async (resolve)=>{
      await Storage.get({ key: 'accessToken' }).then((res)=>{
        console.log('acessToken', res);
        
        if(res?.value){
          resolve(this.isAuthenticated = true);
          this.getUser()
        }else{
          resolve(this.isAuthenticated = false) 
        }
      });
    });
  }

  async getUser(){
    await Storage.get({ key: 'idUser' }).then((res: any)=>{
      console.log('idUser', res);
      if(!res.value){return};
      this.store.dispatch(UserActionTypes.UserGet({id: res.value}))
    })
  }

  async signIn(){
    this.user = await GoogleAuth.signIn();
    const credential = GoogleAuthProvider.credential(this.user.idToken, this.user.authentication.accessToken);
    console.log(credential);
    this.auth.onAuthStateChanged(res => console.log(res))

    console.log(this.user);
    

    if(this.user){
      const user: IUser = {
        id: this.user.id,
        nome:this.user.displayName,
        email: this.user.email,
        foto: this.user.imageUrl
      }
      this.store.dispatch(UserActionTypes.UserSetData({user}));
      this.isAuthenticated = true;
      await Storage.set({key: 'accessToken', value: this.user?.authentication?.accessToken});
      await Storage.set({key: 'idUser', value: this.user?.id});

      this.router.navigate(['/'])

    }
  }

  async logOut() {
    await GoogleAuth.signOut()
    await Storage.clear();
    this.router.navigate(['/login']);
    this.store.dispatch(logoutAction());

    
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
