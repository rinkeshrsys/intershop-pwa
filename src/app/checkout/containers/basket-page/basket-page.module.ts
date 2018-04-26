import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsSharedModule } from '../../../forms/forms-shared.module';
import { SharedProductModule } from '../../../shared/shared-product.module';
import { SharedModule } from '../../../shared/shared.module';
import { ShoppingSharedModule } from '../../../shopping/shopping-shared.module';
import { CheckoutSharedModule } from '../../checkout-shared.module';
import { ShoppingBasketEmptyComponent } from '../../components/basket/shopping-basket-empty/shopping-basket-empty.component';
import { ShoppingBasketComponent } from '../../components/basket/shopping-basket/shopping-basket.component';
import { BasketPageContainerComponent } from './basket-page.container';
import { basketPageRoutes } from './basket-page.routes';

@NgModule({
  imports: [
    RouterModule.forChild(basketPageRoutes),
    SharedModule,
    CheckoutSharedModule,
    ShoppingSharedModule,
    FormsSharedModule,
    SharedProductModule,
  ],
  declarations: [BasketPageContainerComponent, ShoppingBasketComponent, ShoppingBasketEmptyComponent],
  exports: [ShoppingBasketComponent, ShoppingBasketEmptyComponent],
})
export class BasketPageModule {}
