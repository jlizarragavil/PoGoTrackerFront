import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XpLogComponent } from './xp-log.component';

describe('XpLogComponent', () => {
  let component: XpLogComponent;
  let fixture: ComponentFixture<XpLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XpLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XpLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
