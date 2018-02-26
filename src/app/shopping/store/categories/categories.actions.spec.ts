import { Category } from '../../../models/category/category.model';
import * as fromActions from './categories.actions';
import { CategoriesActionTypes } from './categories.actions';

describe('Categories Actions', () => {
  describe('LoadCategory Actions', () => {
    it('should create new action for LoadCategory', () => {
      const payload = '123';
      const action = new fromActions.LoadCategory(payload);

      expect({ ...action }).toEqual({
        type: CategoriesActionTypes.LoadCategory,
        payload
      });
    });

    it('should create new action for LoadCategoryFail', () => {
      const payload = { a: 'a' };
      const action = new fromActions.LoadCategoryFail(payload);

      expect({ ...action }).toEqual({
        type: CategoriesActionTypes.LoadCategoryFail,
        payload
      });
    });

    it('should create new action for LoadCategorySuccess', () => {
      const payload = { uniqueId: '123' } as Category;
      const action = new fromActions.LoadCategorySuccess(payload);

      expect({ ...action }).toEqual({
        type: CategoriesActionTypes.LoadCategorySuccess,
        payload
      });
    });
  });

  it('should create new action for SaveSubCategories', () => {
    const payload = [
      { uniqueId: '123' },
      { uniqueId: '456' }
    ] as Category[];

    const action = new fromActions.SaveSubCategories(payload);

    expect({ ...action }).toEqual({
      type: CategoriesActionTypes.SaveSubCategories,
      payload
    });
  });

  it('should create new action for SetProductSkusForCategory', () => {
    const payload = ['123', '456'];
    const categoryUniqueId = '789';

    const action = new fromActions.SetProductSkusForCategory(
      categoryUniqueId, payload
    );

    expect({ ...action }).toEqual({
      type: CategoriesActionTypes.SetProductSkusForCategory,
      payload,
      categoryUniqueId
    });
  });

});