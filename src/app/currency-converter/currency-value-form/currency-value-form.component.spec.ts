import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyValueFormComponent } from './currency-value-form.component';

describe('CurrencyValueFormComponent', () => {
  let component: CurrencyValueFormComponent;
  let fixture: ComponentFixture<CurrencyValueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyValueFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyValueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
