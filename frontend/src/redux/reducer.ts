import { combineReducers } from "redux";
import { IAccount, ICategory } from "../utils/types";
import * as actionTypes from "./action";

export interface IState {
	language: string;
	totalCount: number;
	page: number;
	profile: actionTypes.IProfileData;
	spends: actionTypes.ISpendResponse;
	totalSpendAmount: number;
	accounts: IAccount[];
	credits: actionTypes.ICreditResponse;
	expenseAnalytics: actionTypes.IAnalyticsData;
	categoryAnalytics: actionTypes.IAnalyticsData;
	yearlyAnalytics: actionTypes.IAnalyticsData;
	remainders: actionTypes.IRemainder[];
	categories: ICategory[];
}

const InitialState: IState = {
	language: "en",
	page: 1,
	totalCount: 100,
	profile: actionTypes.initialProfileData,
	spends: {},
	totalSpendAmount: 0,
	accounts: [],
	credits: {},
	expenseAnalytics: {
		labels: [],
		series: []
	},
	categoryAnalytics: {
		labels: [],
		series: []
	},
	yearlyAnalytics: {
		categories: [],
		series: []
	},
	remainders: [],
	categories: []
};

const stateReducer = (State: IState = InitialState, action: IActionTypes): IState => {
	switch (action.type) {
		case actionTypes.UPDATE_UI_LANGUAGE:
			return {
				...State,
				language: action.payload
			};

		case actionTypes.PAGINATION:
			return {
				...State,
				...action.payload
			};
		case actionTypes.GET_PROFILE_DATA:
			return {
				...State,
				profile: action.payload
			};
		case actionTypes.GET_ALL_EXPENSE:
			return {
				...State,
				spends: action.payload
			};
		case actionTypes.GET_SPENDS_AMOUNT:
			return {
				...State,
				totalSpendAmount: action.payload
			};
		case actionTypes.GET_ALL_ACCOUNTS:
			return {
				...State,
				accounts: action.payload
			};
		case actionTypes.GET_ALL_CREDITS:
			return {
				...State,
				credits: action.payload
			};
		case actionTypes.GET_EXPENSE_ANALYTICS:
			return {
				...State,
				expenseAnalytics: action.payload
			};
		case actionTypes.GET_EXPENSE_ANALYTICS_BY_TYPE:
			return {
				...State,
				categoryAnalytics: action.payload
			};
		case actionTypes.GET_EXPENSE_YEARLY_COMPARISION:
			return {
				...State,
				yearlyAnalytics: action.payload
			};
		case actionTypes.GET_REMAINDERS:
			return {
				...State,
				remainders: action.payload
			};
		case actionTypes.GET_ALL_CATEGORIES:
			return {
				...State,
				categories: action.payload
			};
		default:
			return State;
	}
};

export const reducers = () =>
	combineReducers<ReduxStore>({
		State: stateReducer
	});

export interface ReduxStore {
	State: IState;
}

export type IActionTypes =
	| actionTypes.UiLanguageChangeAction
	| actionTypes.IPaginationAction
	| actionTypes.IGetProfileDataAction
	| actionTypes.IGetAllExpenseAction
	| actionTypes.IGetSpendAmountAction
	| actionTypes.IGetAllAccountsAction
	| actionTypes.IGetAllCreditsAction
	| actionTypes.IGetExpenseAnalyticsAction
	| actionTypes.IGetExpenseYearlyComparisionAction
	| actionTypes.IGetExpenseAnalyticsByTypeAction
	| actionTypes.IGetRemaindersAction
	| actionTypes.IGetAllCategoriesAction;
