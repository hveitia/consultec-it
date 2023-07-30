import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AlertController, ModalController} from "@ionic/angular";
import {AddClientComponent} from "../../components/add-client/add-client.component";
import {HomeService} from "../../services/home.service";
import {Client} from "../../../core/entities/client";
import {Dealer} from "../../../core/entities/dealer";
import {City} from "../../../core/entities/city";
import {HomeViewModelMediator} from "../../services/mediators/home-viemodel-mediator";
import {SubSink} from "subsink";
import {v4 as uuidv4} from "uuid";
import {DetailClientComponent} from "../../components/detail-client/detail-client.component";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy{

  private subSink = new SubSink();
  public showingDeleted: boolean = false;
  public loading: boolean = false;
  public filterDealersHeaderText = this.translate.instant('global.filter_dealers');
  public filterLocationsHeaderText = this.translate.instant('global.filter_locations');
  public clientsList: Client[] = [];
  public dealersList: Dealer[] = [];
  public citiesList: City[] = [];
  public selectedDealers: string[] = [];
  public selectedLocations: string[] = [];

  get viewModel(): HomeViewModelMediator {
    return this.homeService.viewModel;
  }

  constructor(
    public translate: TranslateService,
    private modalCtrl: ModalController,
    private homeService: HomeService,
    private alertController: AlertController
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
        if(!this.showingDeleted){
          this.clientsList = this.clientsList.filter((client: Client) => {
            return !client.deleted;
          });
        }
      });
      this.selectedLocations = this.citiesList.map((city: City) => {
        return city.name;
      });
      this.selectedDealers = this.dealersList.map((dealer: Dealer) => {
        return dealer.name;
      });
    });
  }

  changeCitiesFilter($event: any) {
    this.selectedLocations = $event.target.value;
    this.dealersList = [];
    this.clientsList = [];
    this.selectedLocations.forEach((location: string) => {
      this.citiesList.forEach((city: City) => {
        if(city.name === location){
          this.dealersList = [...this.dealersList, ...city.dealers];
        }
      });
    });
    this.dealersList.forEach((dealer: Dealer) => {
      this.clientsList = [...this.clientsList, ...dealer.clients];
    });
    if(!this.showingDeleted){
      this.clientsList = this.clientsList.filter((client: Client) => {
        return !client.deleted;
      });
    }
  }

  changeDealerFilter($event: any) {
    this.selectedDealers = $event.target.value;
    this.clientsList = [];
    this.selectedDealers.forEach((dealer: string) => {
      this.dealersList.forEach((dealerItem: Dealer) => {
        if(dealerItem.name === dealer){
          this.clientsList = [...this.clientsList, ...dealerItem.clients];
        }
      });
    });
    if(!this.showingDeleted){
      this.clientsList = this.clientsList.filter((client: Client) => {
        return !client.deleted;
      });
    }
  }

  loadValues() {
    this.loading = true;
    this.homeService.getHeadquarter().subscribe({
        next: (v: any) => {
          v[0].cities.forEach((city: City) => {
            city.dealers.forEach((dealer: Dealer) => {
              dealer.clients.forEach((client: Client) => {
                client.idTemp = uuidv4();
              });
            });
          });
          this.viewModel.setHeadquarter(v[0]);
          this.loading = false;
        },
        error: (e) => {
          this.loading = false;
          console.error(e);
        },
        complete: () => {
          this.loading = false;
          console.info('complete');
        }
      }
    );
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddClientComponent,
    });
    await modal.present();
    const result = await modal.onWillDismiss();
    this.handleModalResult(result);
  }

  async openDetailModal(client: Client) {
    this.viewModel.setClientId(client.idTemp);
    const modal = await this.modalCtrl.create({
      component: DetailClientComponent,
    });
    await modal.present();
  }

  addClient() {
    this.viewModel.setEditing(false);
    this.openAddModal().then();
  }

  handleModalResult(result: any) {
    const { data, role } = result;
    if (role === 'confirm') {
      if(this.viewModel.$editing.value){
        const headquarter = this.viewModel.$headquarter.value;
        headquarter.cities.forEach((city: City) => {
          city.dealers.forEach((dealer: Dealer) => {
              dealer.clients.forEach((client: Client) => {
                if(client.idTemp === this.viewModel.$editingClient.value.idTemp){
                  client.name = data.name;
                  client.carBrand = data.brand;
                  client.carModel = data.model;
                }
              });
          });
        });
        this.viewModel.setHeadquarter(headquarter);
        this.homeService.updateHeadquarter().then(() => {
          console.log('updated');
        });
      }
      else {
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
      this.viewModel.setEditing(false);
    }
  }

  editClient(client: Client) {
    this.viewModel.setEditing(true);
    this.viewModel.setEditingClient(client);
    this.openAddModal().then();
  }

  async presentDeleteAlert(client: Client) {
    const alert = await this.alertController.create({
      header: this.translate.instant('global.delete_client_title'),
      message: this.translate.instant('global.delete_client_text'),
      buttons: [
        {
          text: this.translate.instant('global.no'),
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: this.translate.instant('global.yes'),
          role: 'confirm',
          handler: () => {
            this.deleteClient(client);
          },
        },
      ]
    });
    await alert.present();
  }

  deleteClient(client: Client) {
    const headquarter = this.viewModel.$headquarter.value;
    headquarter.cities.forEach((city: City) => {
      city.dealers.forEach((dealer: Dealer) => {
        dealer.clients.forEach((clientItem: Client) => {
          if(clientItem.idTemp === client.idTemp){
            clientItem.deleted = true;
          }
        });
      });
    });
    this.viewModel.setHeadquarter(headquarter);
    this.homeService.updateHeadquarter().then(() => {
      console.log('updated');
    });
  }

  recoverClient(client: Client) {
    const headquarter = this.viewModel.$headquarter.value;
    headquarter.cities.forEach((city: City) => {
      city.dealers.forEach((dealer: Dealer) => {
        dealer.clients.forEach((clientItem: Client) => {
          if(clientItem.idTemp === client.idTemp){
            clientItem.deleted = false;
          }
        });
      });
    });
    this.viewModel.setHeadquarter(headquarter);
    this.homeService.updateHeadquarter().then(() => {
      console.log('updated');
    });
  }

  toggleShowingDeleted() {
    this.showingDeleted = !this.showingDeleted;
    this.viewModel.setHeadquarter(this.viewModel.$headquarter.value);
  }
}
