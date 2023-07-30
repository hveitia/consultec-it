import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import {TranslateModule} from "@ngx-translate/core";
import {AddClientComponent} from "../../components/add-client/add-client.component";
import {DetailClientComponent} from "../../components/detail-client/detail-client.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    TranslateModule,
  ],
  declarations: [HomePage, AddClientComponent, DetailClientComponent]
})
export class HomePageModule {}
