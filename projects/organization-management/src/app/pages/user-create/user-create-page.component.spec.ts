import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MockComponent } from 'ng-mocks';
import { CustomValidators } from 'ngx-custom-validators';
import { instance, mock } from 'ts-mockito';

import { LoadingComponent } from 'ish-shared/components/common/loading/loading.component';

import { UserBudgetFormComponent } from '../../components/user/user-budget-form/user-budget-form.component';
import { UserProfileFormComponent } from '../../components/user/user-profile-form/user-profile-form.component';
import { UserRolesSelectionComponent } from '../../components/user/user-roles-selection/user-roles-selection.component';
import { OrganizationManagementFacade } from '../../facades/organization-management.facade';

import { UserCreatePageComponent } from './user-create-page.component';

describe('User Create Page Component', () => {
  let component: UserCreatePageComponent;
  let fixture: ComponentFixture<UserCreatePageComponent>;
  let element: HTMLElement;
  let organizationManagementFacade: OrganizationManagementFacade;
  let fb: FormBuilder;

  beforeEach(async(() => {
    organizationManagementFacade = mock(OrganizationManagementFacade);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, TranslateModule.forRoot()],
      declarations: [
        MockComponent(LoadingComponent),
        MockComponent(UserBudgetFormComponent),
        MockComponent(UserProfileFormComponent),
        MockComponent(UserRolesSelectionComponent),
        UserCreatePageComponent,
      ],
      providers: [{ provide: OrganizationManagementFacade, useFactory: () => instance(organizationManagementFacade) }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreatePageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fb = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });

  it('should submit a valid form when the user fills all required fields', () => {
    fixture.detectChanges();

    component.form = fb.group({
      profile: fb.group({
        firstName: ['Bernhard', [Validators.required]],
        lastName: ['Boldner', [Validators.required]],
        email: ['test@gmail.com', [Validators.required, CustomValidators.email]],
        preferredLanguage: ['en_US', [Validators.required]],
      }),
      roleIDs: ['Buyer'],
      budgets: fb.group({
        orderSpentLimit: ['70000'],
        budget: [10000],
        budgetPeriod: ['monthly'],
        currency: 'USD',
      }),
    });

    expect(component.formDisabled).toBeFalse();
    expect(component.form.value).toMatchInlineSnapshot(`
      Object {
        "budgets": Object {
          "budget": 10000,
          "budgetPeriod": "monthly",
          "currency": "USD",
          "orderSpentLimit": "70000",
        },
        "profile": Object {
          "email": "test@gmail.com",
          "firstName": "Bernhard",
          "lastName": "Boldner",
          "preferredLanguage": "en_US",
        },
        "roleIDs": "Buyer",
      }
    `);

    component.submitForm();
    expect(component.formDisabled).toBeFalse();
  });

  it('should disable submit button when the user submits an invalid form', () => {
    fixture.detectChanges();

    expect(component.formDisabled).toBeFalse();
    component.submitForm();
    expect(component.formDisabled).toBeTrue();
  });
});
