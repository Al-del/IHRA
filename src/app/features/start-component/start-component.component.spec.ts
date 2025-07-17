import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartComponentComponent } from './start-component.component';

describe('StartComponentComponent', () => {
  let component: StartComponentComponent;
  let fixture: ComponentFixture<StartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
