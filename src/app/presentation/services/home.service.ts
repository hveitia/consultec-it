import { Injectable } from '@angular/core';
import {FirebaseRepository} from "../../core/repositories/firebase-repository";
import {Observable} from "rxjs";
import {Headquarter} from "../../core/entities/headquarter";
import {HomeViewModelMediator} from "./mediators/home-viemodel-mediator";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private uiViewModelMediator = new HomeViewModelMediator();

  get viewModel(): HomeViewModelMediator {
    return this.uiViewModelMediator;
  }

  constructor(private firebaseRepository: FirebaseRepository) { }

  getHeadquarter(): Observable<Headquarter>{
    return this.firebaseRepository.getHeadquarter();
  }

  updateHeadquarter() {
    const headquarter = this.viewModel.$headquarter.value;
    return this.firebaseRepository.updateHeadquarter(headquarter);
  }

}
