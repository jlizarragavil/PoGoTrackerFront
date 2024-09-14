import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GblGameComponent } from './gbl-game.component';

describe('GblGameComponent', () => {
  let component: GblGameComponent;
  let fixture: ComponentFixture<GblGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GblGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GblGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
