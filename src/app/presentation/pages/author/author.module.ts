import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthorPageRoutingModule} from "./author-routing.module";
import {AuthorPage} from "./author.page";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AuthorPageRoutingModule
  ],
  declarations: [AuthorPage]
})
export class AuthorPageModule {}
