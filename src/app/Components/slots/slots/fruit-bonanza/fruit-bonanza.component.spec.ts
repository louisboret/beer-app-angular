import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitBonanzaComponent } from './fruit-bonanza.component';

describe('FruitBonanzaComponent', () => {
  let component: FruitBonanzaComponent;
  let fixture: ComponentFixture<FruitBonanzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FruitBonanzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FruitBonanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
