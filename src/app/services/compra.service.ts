import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ICompra } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(public afs: Firestore) {}

  async addOne(item: any) {
    const compraRef = collection(this.afs, 'compras');
    const docRef = addDoc(compraRef, item);
    return (await docRef).id;
  }

  getAll(): Observable<any[]> {
    const collectionRef = collection(this.afs, 'compras');
    return collectionData(collectionRef, { idField: 'id' }) as Observable<any[]>;
  }

  getOne(id: string) {
    const docRef = doc(this.afs, `compras/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<any[]>;
  }

  updateOne(compra: ICompra) {
    const docRef = doc(this.afs, `compras/${compra.id}`);
    return setDoc(docRef, compra);
  }

  deleteOne(id: string) {
    const docRef = doc(this.afs, `compras/${id}`);
    return deleteDoc(docRef);
  }
}
