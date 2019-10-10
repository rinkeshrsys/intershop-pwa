import { createReducer, on } from '@ngrx/store';

import { CategoryTree, CategoryTreeHelper } from 'ish-core/models/category-tree/category-tree.model';

import { loadCategoryFail, loadCategorySuccess, loadTopLevelCategoriesSuccess } from './categories.actions';

export interface CategoriesState {
  categories: CategoryTree;
  topLevelLoaded: boolean;
}

export const initialState: CategoriesState = {
  categories: CategoryTreeHelper.empty(),
  topLevelLoaded: false,
};

function mergeCategories(
  state: CategoriesState,
  action: ReturnType<typeof loadTopLevelCategoriesSuccess | typeof loadCategorySuccess>
) {
  const loadedTree = action.payload.categories;
  const categories = CategoryTreeHelper.merge(state.categories, loadedTree);
  return {
    ...state,
    categories,
  };
}

export const categoriesReducer = createReducer(
  initialState,
  on(loadCategoryFail, (state: CategoriesState) => ({
    ...state,
  })),
  on(loadTopLevelCategoriesSuccess, (state: CategoriesState, action) => ({
    ...mergeCategories(state, action),
    topLevelLoaded: true,
  })),
  on(loadCategorySuccess, mergeCategories)
);
