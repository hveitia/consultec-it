import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {AuthorPage} from "./author.page";

describe('Tab2Page', () => {
  let component: AuthorPage;
  let fixture: ComponentFixture<AuthorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorPage],
      imports: [IonicModule.forRoot(),]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
