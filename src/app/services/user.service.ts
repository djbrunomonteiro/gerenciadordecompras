import { Injectable } from '@angular/core';
import { docData, Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public afs: Firestore
  ) { }

  addUser(user: IUser): Promise<any>{
    return new Promise((resolve, reject)=>{
      setDoc(doc(this.afs, "users", user.id), user)
        .then((res)=>  resolve(res))
        .catch(err => reject(err))
    })
  }

  getUser(id: string): Observable<any> {
    const itemRef = doc(this.afs, `users/${id}`);
    return docData(itemRef, { idField: 'id' })
   
  }
}
