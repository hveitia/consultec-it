import { Component } from '@angular/core';
import {LEGAL} from "../../../app.constants";

@Component({
  selector: 'app-legal',
  templateUrl: 'legal.page.html',
  styleUrls: ['legal.page.scss']
})
export class LegalPage {

  legalText = LEGAL;
  constructor() {}

}
