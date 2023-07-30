import { Component } from '@angular/core';
import {AUTHOR_EMAIL, AUTHOR_NAME, AUTHOR_PHONE, AUTHOR_URL, IMG_URL} from "../../../app.constants";

@Component({
  selector: 'app-author',
  templateUrl: 'author.page.html',
  styleUrls: ['author.page.scss']
})
export class AuthorPage {

  authorName = AUTHOR_NAME;
  authorEmail = AUTHOR_EMAIL;
  authorUrl =AUTHOR_URL;
  authorPhone = AUTHOR_PHONE;
  imgUrl = IMG_URL;
  constructor() {}

}
