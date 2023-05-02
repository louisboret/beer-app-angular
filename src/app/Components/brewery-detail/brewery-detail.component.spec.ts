import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryDetailComponent } from './brewery-detail.component';

describe('BreweryDetailComponent', () => {
  let component: BreweryDetailComponent;
  let fixture: ComponentFixture<BreweryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreweryDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreweryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
