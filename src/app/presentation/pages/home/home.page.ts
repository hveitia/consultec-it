import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ModalController} from "@ionic/angular";
import {AddClientComponent} from "../../components/add-client/add-client.component";
import {HomeService} from "../../services/home.service";
import {Client} from "../../../core/entities/client";
import {Dealer} from "../../../core/entities/dealer";
import {City} from "../../../core/entities/city";
import {HomeViewModelMediator} from "../../services/mediators/home-viemodel-mediator";
import {SubSink} from "subsink";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy{

  private subSink = new SubSink();
  public showingDeleted: boolean = false;
  public filterDealersHeaderText = this.translate.instant('global.filter_dealers');
  public filterLocationsHeaderText = this.translate.instant('global.filter_locations');
  public clientsList: Client[] = [];
  public dealersList: Dealer[] = [];
  public citiesList: City[] = [];

  get viewModel(): HomeViewModelMediator {
    return this.homeService.viewModel;
  }
  constructor(
    public translate: TranslateService,
    private modalCtrl: ModalController,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {
    this.subscribeViewModelData()
    this.loadValues();
  }

  ngOnDestroy(){
    this.subSink.unsubscribe();
  }

  subscribeViewModelData(){
    this.subSink.sink = this.viewModel.$headquarter.subscribe((headquarter) => {
      this.citiesList = headquarter.cities;
      this.dealersList = [];
      this.clientsList = [];
      this.citiesList.forEach((city: City) => {
        this.dealersList = [...this.dealersList, ...city.dealers];
      });
      this.dealersList.forEach((dealer: Dealer) => {
        this.clientsList = [...this.clientsList, ...dealer.clients];
      });
    } );
  }

  loadValues() {
    this.homeService.getHeadquarter().subscribe({
        next: (v: any) => {
          this.viewModel.setHeadquarter(v[0]);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
    );
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddClientComponent,
    });
    await modal.present();
    const result = await modal.onWillDismiss();
    this.handleModalResult(result);
  }

  handleModalResult(result: any) {
    const { data, role } = result;
    if (role === 'confirm') {
      const newClient: Client = {
        name: data.name,
        carBrand: data.brand,
        carModel: data.model,
        deleted: false,
      }
      const headquarter = this.viewModel.$headquarter.value;
      headquarter.cities.forEach((city: City) => {
        city.dealers.forEach((dealer: Dealer) => {
          if (dealer.name === data.dealer) {
            dealer.clients.push(newClient);
          }
        });
      });
      this.viewModel.setHeadquarter(headquarter);
      this.homeService.updateHeadquarter().then(() => {
        console.log('updated');
      });
    }
    console.log(data, role);
  }
}
