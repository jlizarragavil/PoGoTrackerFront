import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchingCalculatorComponent } from './catching-calculator.component';

describe('CatchingCalculatorComponent', () => {
  let component: CatchingCalculatorComponent;
  let fixture: ComponentFixture<CatchingCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatchingCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatchingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
