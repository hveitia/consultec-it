import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {Headquarter} from "../entities/headquarter";

@Injectable({
  providedIn: 'root'
})
export class FirebaseRepository{
  headquarterReference: AngularFirestoreCollection;

    constructor(private db: AngularFirestore) {
      this.headquarterReference = this.db.collection('headquarters');
    }

    getHeadquarter(): Observable<Headquarter> {
      return this.headquarterReference.snapshotChanges().pipe(
        map((firebaseIdList: any) => firebaseIdList.map((firebaseObj: any) => {
          const result = firebaseObj.payload.doc.data() as Headquarter;
          result.$key = firebaseObj.payload.doc.id;
          return result;
        })),
      );
    }

    updateHeadquarter(headquarter: Headquarter) {
      return this.headquarterReference.doc(headquarter.$key).update(headquarter)
    }

}
