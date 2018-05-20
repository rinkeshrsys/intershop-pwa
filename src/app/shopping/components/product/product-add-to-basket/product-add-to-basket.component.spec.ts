import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Product } from '../../../../models/product/product.model';
import { ProductAddToBasketComponent } from './product-add-to-basket.component';

describe('Product Add To Basket Component', () => {
  let component: ProductAddToBasketComponent;
  let fixture: ComponentFixture<ProductAddToBasketComponent>;
  let product: Product;
  let translate: TranslateService;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService],
      declarations: [ProductAddToBasketComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddToBasketComponent);
    component = fixture.componentInstance;
    translate = TestBed.get(TranslateService);
    translate.setDefaultLang('en');
    translate.use('en');
    product = { sku: 'sku' } as Product;
    product.inStock = true;
    product.minOrderQuantity = 1;
    product.availability = true;
    element = fixture.nativeElement;
    component.product = product;
    component.ngOnChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(function() {
      fixture.detectChanges();
    }).not.toThrow();
  });

  it('should throw an error if input parameter product is not set', () => {
    component.product = null;
    expect(function() {
      fixture.detectChanges();
    }).toThrow();
  });

  it('should not render when inStock = false', () => {
    product.inStock = false;
    fixture.detectChanges();
    expect(element.querySelector('button')).toBeFalsy();
  });

  it('should show button when display type is not glyphicon ', () => {
    fixture.detectChanges();
    expect(element.querySelector('button').className).toContain('btn-primary');
  });

  it('should show glyphicon button when display type is glyphicon ', () => {
    component.displayType = 'glyphicon';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(element.querySelector('span').className).toContain('glyphicon');
  });

  it('should show disable button when "disabled" is set to "false" ', () => {
    component.disabled = true;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(element.querySelector('button').disabled).toBeTruthy();
  });
});