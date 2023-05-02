import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBreweryComponent } from './add-brewery.component';

describe('AddBreweryComponent', () => {
  let component: AddBreweryComponent;
  let fixture: ComponentFixture<AddBreweryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBreweryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBreweryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
