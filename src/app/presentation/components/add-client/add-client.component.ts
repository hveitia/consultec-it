import {Component, OnInit} from '@angular/core';

import { ModalController } from '@ionic/angular';
import {HomeViewModelMediator} from "../../services/mediators/home-viemodel-mediator";
import {HomeService} from "../../services/home.service";
import {Dealer} from "../../../core/entities/dealer";

@Component({
  selector: 'app-add-client',
  templateUrl: 'add-client.component.html',
  styleUrls: ['add-client.component.scss']
})
export class AddClientComponent implements OnInit{
  name: string = '';
  brand: string =   '';
  model: string = '';
  dealer: string = '';
  dealerList: Dealer[] = [];

  get viewModel(): HomeViewModelMediator {
    return this.homeService.viewModel;
  }

  constructor(private modalCtrl: ModalController,  private homeService: HomeService,) {

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.name !== '' && this.brand !== '' && this.model !== '' && this.dealer !== '') {
      return this.modalCtrl.dismiss({
        name: this.name,
        brand: this.brand,
        model: this.model,
        dealer: this.dealer
      }, 'confirm');
    }
    else{
      return;
    }

  }

  ngOnInit(): void {
    this.viewModel.$headquarter.value.cities.forEach((city) => {
      this.dealerList = [...this.dealerList, ...city.dealers];
    });
  }
}
