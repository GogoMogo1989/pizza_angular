import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailDialogComponentComponent } from './product-detail-dialog-component.component';

describe('ProductDetailDialogComponentComponent', () => {
  let component: ProductDetailDialogComponentComponent;
  let fixture: ComponentFixture<ProductDetailDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailDialogComponentComponent]
    });
    fixture = TestBed.createComponent(ProductDetailDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
