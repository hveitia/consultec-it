import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthorPageRoutingModule} from "./author-routing.module";
import {AuthorPage} from "./author.page";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthorPageRoutingModule,
    TranslateModule
  ],
  declarations: [AuthorPage]
})
export class AuthorPageModule {}
