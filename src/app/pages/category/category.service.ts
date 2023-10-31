import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs";

export interface Category{
  category?: string;
  Id?: string;
}
export interface Model{
  id?: string;
  data?: any;
}
export interface Value{
  data?: any;
  id?: string;
}
@Injectable({
  providedIn: "root"
})
export class CategoryService{
  constructor(private angularFireStore: AngularFirestore) {
  }
  Add(data: any){
    this.angularFireStore.collection('categories').add(data).then(docRef =>{
      console.log(docRef);
    }).catch(err => {
      console.log(err);
    });
  }

  loadData(){
    return this.angularFireStore.collection('categories').snapshotChanges().pipe(
      map(action =>{
        return action.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {data, id};
        })
      })
    )
  }

  find(id: any){
    // const objectId = id;
    // const Id = objectId.id;
    // console.log(id);
    // return this.angularFireStore.doc(`posts/${Id}`).valueChanges();
    return this.angularFireStore.collection('categories').doc(id).valueChanges();
  }

  updateData(id: any, editData: any){
    this.angularFireStore.collection('categories').doc(id).update(editData).then(docRef =>{
      console.log(docRef);
    }).catch(err => {
      console.log(err);
    });
  }

  deleteData(id:any){
    this.angularFireStore.collection('categories').doc(id).delete().then(docRef =>{
      console.log(docRef);
    }).catch(err => {
      console.log(err);
    });
  }
}
