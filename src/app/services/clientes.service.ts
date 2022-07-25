import { ICliente } from './../models/cliente';
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
export class ClientesService {

  constructor(public afs: Firestore) {}

  async addOne(item: any) {
    const clienteRef = collection(this.afs, 'clientes');
    const docRef = addDoc(clienteRef, item);
    return (await docRef).id;
  }

  getAll(): Observable<any[]> {
    const collectionRef = collection(this.afs, 'clientes');
    return collectionData(collectionRef, { idField: 'id' }) as Observable<any[]>;
  }

  getOne(id: string) {
    const docRef = doc(this.afs, `clientes/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<any[]>;
  }

  async updateOne(cliente: ICliente) {
    const docRef = doc(this.afs, `clientes/${cliente.id}`);
    (await setDoc(docRef, cliente))
    return docRef.id
  }

  deleteOne(id: string) {
    const docRef = doc(this.afs, `clientes/${id}`);
    return deleteDoc(docRef);
  }
}
