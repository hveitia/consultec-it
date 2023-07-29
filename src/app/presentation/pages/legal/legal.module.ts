import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LegalPage } from './legal.page';
import {TranslateModule} from "@ngx-translate/core";
import {LegalPageRoutingModule} from "./legal-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LegalPageRoutingModule,
    TranslateModule
  ],
  declarations: [LegalPage]
})
export class LegalPageModule {}
