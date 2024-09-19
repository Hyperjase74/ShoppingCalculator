import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemnameComponent } from './itemname.component';

describe('ItemnameComponent', () => {
  let component: ItemnameComponent;
  let fixture: ComponentFixture<ItemnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemnameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
