import {BehaviorSubject} from "rxjs";
import {Headquarter} from "../../../core/entities/headquarter";


export class HomeViewModelMediator {
  public $headquarter: BehaviorSubject<Headquarter> = new BehaviorSubject<Headquarter>(new Headquarter());

  constructor() {
  }

  setHeadquarter(value: Headquarter) {
    this.$headquarter.next(value);
  }
}
