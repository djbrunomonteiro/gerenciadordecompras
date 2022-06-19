import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authGet: any;
  isAuthenticated: boolean = false;

  constructor(
    private afs: Firestore,
    private auth: Auth,
    private router: Router
  ) {
    this.authGet = getAuth();
  }

  logOut() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  checkAuthenticated() {
    authState(this.authGet).subscribe((res) =>
      res ? (this.isAuthenticated = true) : (this.isAuthenticated = false)
    );
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
