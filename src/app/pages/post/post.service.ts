import {Injectable} from "@angular/core";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {map} from "rxjs";
export interface Post{
  id: string;
  data: {
    title: string;
    permalink: string;
    category: {
      categoryId: string
      category: string;
    }
    postImagePath: string;
    excerpt: string;
    content: string;
    isFeatured: boolean;
    views: number;
    status: string;
    createAt: Date;
  }
}
@Injectable({
  providedIn: "root"
})
export class PostService{

  constructor(
    private angularFireStorage: AngularFireStorage,
    private angularFireStore: AngularFirestore,
    private router: Router
  ) {
  }
  uploadImage(selectImage: any, postData: any, formStatus: string, id: any){
    const filePath = `postIMG/${Date.now()}`;
    // console.log(filePath);
    this.angularFireStorage.upload(filePath, selectImage).then(() =>{
      console.log("image upload successfully")
      this.angularFireStorage.ref(filePath).getDownloadURL().subscribe(URL =>{
        // console.log(URL);
        postData.postImagePath = URL;
        // console.log(postData)
        if (formStatus == 'Edit'){
          const objectId = id;
          const Id = objectId.id;
          this.updateData(Id, postData);
        }else {
          this.add(postData);
        }
      })
    });
  }

  add(postData:any){
    this.angularFireStore.collection('posts').add(postData).then(docRef =>{
      console.log("data upload successfully");
    });
  }

  loadData(){
    return this.angularFireStore.collection('posts').snapshotChanges().pipe(
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
    return this.angularFireStore.collection('posts').doc(id).valueChanges();
  }

  updateData(id:string, postData: any){
    this.angularFireStore.doc(`posts/${id}`).update(postData).then(()=>{
      console.log("Update data successfully");
    })
  }

  deleteImage(postImagePath: any, id: any){
    // console.log(postImagePath);
    this.angularFireStorage.storage.refFromURL(postImagePath).delete().then(()=>{
      console.log("Delete Image done!");
    });
    this.deleteData(id);
  }

  deleteData(id: any){
    this.angularFireStore.doc(`posts/${id}`).delete().then(()=>{
      console.log("Delete Data done!");
    });
  }

  markFeatured(id:any, featureData: any){
    this.angularFireStore.doc(`posts/${id}`).update(featureData).then(()=>{
      console.log("Feature Status Update");
    })
  }

}
