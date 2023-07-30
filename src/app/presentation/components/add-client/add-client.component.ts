import {Component, OnInit} from '@angular/core';

import { ModalController } from '@ionic/angular';
import {HomeViewModelMediator} from "../../services/mediators/home-viemodel-mediator";
import {HomeService} from "../../services/home.service";
import {Dealer} from "../../../core/entities/dealer";
import {TranslateService} from "@ngx-translate/core";

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
  title: string = '';

  get viewModel(): HomeViewModelMediator {
    return this.homeService.viewModel;
  }

  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService,
    private translate: TranslateService
    ) {}

  ngOnInit(): void {
    this.viewModel.$headquarter.value.cities.forEach((city) => {
      this.dealerList = [...this.dealerList, ...city.dealers];
    });
    if(this.viewModel.$editing.value){
      this.name = this.viewModel.$editingClient.value.name;
      this.brand = this.viewModel.$editingClient.value.carBrand;
      this.model = this.viewModel.$editingClient.value.carModel;
      this.title = this.translate.instant('global.client_edit_header');
    }else{
      this.title = this.translate.instant('global.client_add_header');
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.name !== '' && this.brand !== '' && this.model !== '') {
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
}
