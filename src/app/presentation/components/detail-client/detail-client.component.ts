import {Component, OnInit} from "@angular/core";
import {HomeViewModelMediator} from "../../services/mediators/home-viemodel-mediator";
import {HomeService} from "../../services/home.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-detail-client',
  templateUrl: 'detail-client.component.html',
  styleUrls: ['detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {

  name: string = '';
  brand: string =   '';
  model: string = '';
  dealer: string = '';
  location: string = '';

  get viewModel(): HomeViewModelMediator {
    return this.homeService.viewModel;
  }
  constructor(
    private modalCtrl: ModalController,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.viewModel.$headquarter.value.cities.forEach((city) => {
      city.dealers.forEach((dealer) => {
        dealer.clients.forEach((client) => {
          if (client.idTemp === this.viewModel.$clientId.value) {
            this.name = client.name;
            this.brand = client.carBrand;
            this.model = client.carModel;
            this.dealer = dealer.name;
            this.location = city.name;
          }
        });
      });
    });
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

}
