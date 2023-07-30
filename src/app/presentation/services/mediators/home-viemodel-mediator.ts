import {BehaviorSubject} from "rxjs";
import {Headquarter} from "../../../core/entities/headquarter";
import {Client} from "../../../core/entities/client";

export class HomeViewModelMediator {
  public $headquarter: BehaviorSubject<Headquarter> = new BehaviorSubject<Headquarter>(new Headquarter());
  public $editing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public $editingClient: BehaviorSubject<Client> = new BehaviorSubject<Client>(new Client());
  public $clientId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
  }

  setHeadquarter(value: Headquarter) {
    this.$headquarter.next(value);
  }

  setEditing(value: boolean) {
    this.$editing.next(value);
  }

  setEditingClient(value: Client) {
    this.$editingClient.next(value);
  }

  setClientId(value: string | undefined) {
    if (value !== undefined) {
      this.$clientId.next(value);
    }
  }
}
