import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GBLComponent } from './gbl.component';

describe('GBLComponent', () => {
  let component: GBLComponent;
  let fixture: ComponentFixture<GBLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GBLComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GBLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
