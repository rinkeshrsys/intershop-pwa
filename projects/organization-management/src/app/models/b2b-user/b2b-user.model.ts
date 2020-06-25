import { User } from 'ish-core/models/user/user.model';

import { UserBudgets } from '../user-budgets/user-budgets.model';

export interface B2bUser extends Partial<User> {
  name?: string; // list call only
  roleIDs?: string[];
  budgets?: UserBudgets;
}
