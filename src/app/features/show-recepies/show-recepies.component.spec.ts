import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecepiesComponent } from './show-recepies.component';

describe('ShowRecepiesComponent', () => {
  let component: ShowRecepiesComponent;
  let fixture: ComponentFixture<ShowRecepiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRecepiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRecepiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
