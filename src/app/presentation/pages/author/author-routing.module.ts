import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorPage} from "./author.page";

const routes: Routes = [
  {
    path: '',
    component: AuthorPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorPageRoutingModule {}
