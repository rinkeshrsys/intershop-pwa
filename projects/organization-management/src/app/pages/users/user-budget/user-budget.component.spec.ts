import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';

import { Price } from 'ish-core/models/price/price.model';
import { PricePipe } from 'ish-core/models/price/price.pipe';

import { UserBudgetComponent } from './user-budget.component';

describe('User Budget Component', () => {
  let component: UserBudgetComponent;
  let fixture: ComponentFixture<UserBudgetComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbPopoverModule, RouterTestingModule, TranslateModule.forRoot()],
      declarations: [MockPipe(PricePipe, (price: Price) => `${price.currency} ${price.value}`), UserBudgetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBudgetComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.budget = {
      orderSpentLimit: {
        value: 100,
        currency: 'USD',
        type: 'Money',
      },
      budget: {
        value: 5000,
        currency: 'USD',
        type: 'Money',
      },
      budgetPeriod: 'monthly',
      remainingBudget: {
        value: 2500,
        currency: 'USD',
        type: 'Money',
      },
    };
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => component.ngOnChanges()).not.toThrow();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should display budgets when rendering', () => {
    component.ngOnChanges();
    fixture.detectChanges();

    expect(element).toMatchInlineSnapshot(`
      <div>
        <dl>
          <dt>account.user.new.order_spend_limit.label</dt>
          <dd>USD 100</dd>
        </dl>
        <dl>
          <dt>account.budget.common.per_type</dt>
          <dd>USD 5000</dd>
          <dd>
            <div data-testing-id="user-budget-popover" placement="top" ng-reflect-placement="top">
              <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 50%;">
                  <span class="progress-display">50%</span>
                </div>
              </div>
            </div>
          </dd>
        </dl>
      </div>
    `);
  });

  it('should return 2500 used budget when remaining budget is 2500', () => {
    component.ngOnChanges();

    expect(component.usedBudget.value).toEqual(2500);
  });

  it('should display 50% for the used budget percentage', () => {
    component.ngOnChanges();

    expect(component.usedBudgetPercentage).toEqual(0.5);
  });

  it('should display 50% for the remaining budget', () => {
    component.ngOnChanges();

    expect(component.remainingBudgetPercentage).toEqual(0.5);
  });
});
