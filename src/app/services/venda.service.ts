import { IVenda } from './../models/venda';
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


@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(public afs: Firestore) {}

  async addOne(item: any) {
    const vendaRef = collection(this.afs, 'vendas');
    const docRef = addDoc(vendaRef, item);
    console.log('cliente,', item);
    return (await docRef).id;
  }

  getAll(): Observable<any[]> {
    const collectionRef = collection(this.afs, 'vendas');
    return collectionData(collectionRef, { idField: 'id' }) as Observable<any[]>;
  }

  getOne(id: string) {
    const docRef = doc(this.afs, `vendas/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<any[]>;
  }

  updateOne(venda: IVenda) {
    const docRef = doc(this.afs, `vendas/${venda.id}`);
    return setDoc(docRef, venda);
  }

  deleteOne(id: string) {
    const docRef = doc(this.afs, `vendas/${id}`);
    return deleteDoc(docRef);
  }
}
