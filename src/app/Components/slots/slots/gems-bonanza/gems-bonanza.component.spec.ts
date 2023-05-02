import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GemsBonanzaComponent } from './gems-bonanza.component';

describe('GemsBonanzaComponent', () => {
  let component: GemsBonanzaComponent;
  let fixture: ComponentFixture<GemsBonanzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GemsBonanzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GemsBonanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
