import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

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

  uploadImagem(file: any, path: string, fileName: string) {
    return new Promise(async (resolve, reject) => {
      const filePath = path + '/' + fileName;
      const response = await fetch(file.webPath);
      const blob = await response.blob();
      this.storageRef = ref(this.storage, filePath);
      uploadBytes(this.storageRef, blob).then((snapshot) => {
        console.log(snapshot);
        getDownloadURL(snapshot.ref).then( url => {
          resolve(url);
        });

        return;
      }).catch(err => reject(err));
    });
  }
}
