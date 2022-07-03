import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadsService {
  storage = getStorage();
  storageRef;

  constructor() {}

  // uploadImagem(file: any, path: string, nome: string): Promise<any>{
  //   return new Promise((resolve, reject)=>{
  //     const filePath = path + '/'+ nome;
  //     const ref = this.storage.ref(filePath);
  //     const task = ref.put(file)
  //       .then(res => resolve(res))
  //        .catch(err => reject(err));
  //   })
  // }

  uploadImagem(file: any, path: string, nome: string) {
    return new Promise((resolve, reject) => {
      const filePath = path + '/' + nome;
      this.storageRef = ref(this.storage, filePath);
      uploadBytes(this.storageRef, file).then((snapshot) => {
        console.log(snapshot);
        resolve(snapshot);
        return;
      }).catch(err => reject(err));
    });
  }
}
