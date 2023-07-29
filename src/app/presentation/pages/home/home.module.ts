import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import {TranslateModule} from "@ngx-translate/core";
import {AddClientComponent} from "../../components/add-client/add-client.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    TranslateModule,
  ],
  declarations: [HomePage, AddClientComponent,]
})
export class HomePageModule {}
