import moment from "moment";
import { Dispatch } from "redux";
import { getCookieObj, setCookie, setCookieObj } from "../utils/cookie";
import { sleep } from "../utils/functions";
import { deleteWithToken, getWithToken, patchWithToken, postWithToken } from "../utils/request";
import * as actionTypes from "../utils/types";

export const UPDATE_UI_LANGUAGE = "UPDATE_UI_LANGUAGE";
/**
 * @description method to update UI language over the project
 * @author Jagan
 * @date 29-10-2021
 * @param lang: string
 */
export function changeUiLanguage(lang: string) {
	return async function (dispatch: Dispatch<UiLanguageChangeAction>) {
		setCookie("lang", lang);
		dispatch({
			type: UPDATE_UI_LANGUAGE,
			payload: lang
		});
	};
}
export interface UiLanguageChangeAction {
	type: typeof UPDATE_UI_LANGUAGE;
	payload: string;
}

export const loginAction = (payload: actionTypes.ILoginPayload) => {
	return async function () {
		try {
			const response = await postWithToken("/login", payload);
			if (response.status === 200) {
				const result = response.data.data;
				console.log("result", result);
				setCookie("token", `Bearer ${result.token}`);

				setCookie("userId", `${result.userId}`);
				setCookie("email", `${result.email}`);
			} else {
				throw response;
			}
			return response;
		} catch (error: any) {
			console.log("error", error);
			throw error;
		}
	};
};

export const PAGINATION = "PAGINATION";

export interface IPaginationAction {
	type: typeof PAGINATION;
	payload: actionTypes.IPagination;
}
export const COUNTRIES_LIST = "COUNTRIES_LIST";
export interface ICountry {
	label: string;
	value: string;
}
export interface IGetCountryListAction {
	type: typeof COUNTRIES_LIST;
	payload: ICountry[];
}

export const getCountryList = () => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await getWithToken(`/country`);
			if (response?.data?.data) {
				// const countriesList = response.data.data?.map((item) => ({ label: item.name, value: item.id }));
				// dispatch({
				//     type: COUNTRIES_LIST,
				//     payload: countriesList || [],
				// });
				// return countriesList;
			} else {
				return [];
			}
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export interface IAddress {
	addressLine1?: string;
	addressLine2?: string;
	city?: string;
	state?: string;
	country?: string;
	postalCode?: number;
}

export const initialProfileData: IProfileData = {
	totalSpends: 0,
	totalCredits: 0,
	totalBalance: 0,
	totalAccountBalance: 0,
	name: "",
	email: "",
	profilePic: "",
	banner: ""
};

export interface IProfileData {
	totalSpends: number;
	totalCredits: number;
	totalBalance: number;
	totalAccountBalance: number;
	name: string;
	email: string;
	profilePic: string;
	banner: string;
	// businessName?: string;
	// businessLogo?: string;
	// ownerName?: string;
	// ownerPhoto?: string;
	// phone?: string;
	// email?: string;
	// signature?: string;
	// businessAddress?: IAddress;
}
export interface IGetProfileDataAction {
	type: typeof GET_PROFILE_DATA;
	payload: IProfileData;
}

export const GET_PROFILE_DATA = "GET_PROFILE_DATA";
export const getProfileDataAction = () => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await getWithToken("/profile");
			dispatch({
				type: GET_PROFILE_DATA,
				payload: response.data
			});
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const UPDATE_PROFILE_DATA = "UPDATE_PROFILE_DATA";
export const updateProfileDataAction = (payload: IProfileData) => {
	return async (dispatch: Dispatch) => {
		try {
			const result = getCookieObj("profile");
			const payloadData: IProfileData = {
				...result,
				...payload
			};
			const response = await setCookieObj("profile", payloadData);
			await sleep(200);
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export interface IExpensePayload {
	title: string;
	amount: number;
	category: actionTypes.ICategory | "";
	account: actionTypes.IAccount | null;
	note?: string;
	expenseDate: string;
}

export const addNewSpendAction = (payload: IExpensePayload) => {
	return async () => {
		try {
			const response = await postWithToken("/spends", payload);
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const GET_ALL_EXPENSE = "GET_ALL_EXPENSE";
export interface IGetAllExpenseAction {
	type: typeof GET_ALL_EXPENSE;
	payload: ISpendResponse;
}
export interface ISpendQuery {
	startDate: string;
	endDate: string;
	accounts?: string[] | null;
	category?: string[] | null;
}
export interface ISpendResponse {
	[key: string]: actionTypes.ISpend[];
}
export const getAllExpenseAction = (query: actionTypes.IExpenseFilters) => {
	return async (dispatch: Dispatch) => {
		try {
			let url = `/spends?startDate=${query.startDate}&endDate=${query.endDate}`;
			if (query.accounts?.length) {
				url = `${url}&accounts=${query.accounts.join(",")}`;
			}
			if (query.category?.length) {
				url = `${url}&accounts=${query.category.join(",")}`;
			}
			const response = await getWithToken(url);
			const data = response.data || [];
			const result: ISpendResponse = {};
			data.forEach((element: actionTypes.ISpend) => {
				let formatedDate: string = moment(element.expenseDate).format("YYYY-MM-DD");
				if (result[formatedDate]) {
					result[formatedDate].push(element);
				} else {
					result[formatedDate] = [element];
				}
			});
			dispatch({
				type: GET_ALL_EXPENSE,
				payload: result
			});
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const GET_SPENDS_AMOUNT = "GET_SPENDS_AMOUNT";
export interface ISpendAmount {
	totalAmount: number;
}
export interface IGetSpendAmountAction {
	type: typeof GET_SPENDS_AMOUNT;
	payload: number;
}
export const getSpendCalculationAction = (query: actionTypes.IExpenseFilters) => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await getWithToken(`/spends/total?startDate=${query.startDate}&endDate=${query.endDate}`);
			dispatch({
				type: GET_SPENDS_AMOUNT,
				payload: response.data?.totalAmount || 0
			});
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export interface ICreditPayload {
	title: string;
	amount: number;
	category: actionTypes.ICategory | "";
	account: actionTypes.IAccount | null;
	note?: string;
	creditDate: string;
}

export const addNewCreditAction = (payload: ICreditPayload) => {
	return async () => {
		try {
			const response = await postWithToken("/credits", payload);
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const addNewAccountAction = (payload: actionTypes.IAccount) => {
	return async () => {
		try {
			const response = await postWithToken("/accounts", payload);
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const GET_ALL_ACCOUNTS = "GET_ALL_ACCOUNTS";
export interface IGetAllAccountsAction {
	type: typeof GET_ALL_ACCOUNTS;
	payload: actionTypes.IAccount[];
}
export const getAllAccountsAction = () => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await getWithToken("/accounts");
			dispatch({
				type: GET_ALL_ACCOUNTS,
				payload: response.data
			});
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const updateAccountAction = (payload: actionTypes.IAccount) => {
	return async () => {
		try {
			const id = payload._id;
			delete payload._id;
			const response = await patchWithToken(`/accounts/${id}`, payload);
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const deleteAccountAction = (id: string) => {
	return async () => {
		try {
			const response = await getWithToken(`/accounts/${id}`);
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const GET_ALL_CREDITS = "GET_ALL_CREDITS";
export interface IGetAllCreditsAction {
	type: typeof GET_ALL_CREDITS;
	payload: ICreditResponse;
}
export interface ISpendQuery {
	startDate: string;
	endDate: string;
}

export interface ICreditResponse {
	[key: string]: actionTypes.ICredit[];
}
export const getAllCreditsAction = (query: ISpendQuery) => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await getWithToken(`/credits?startDate=${query.startDate}&endDate=${query.endDate}`);
			const data = response.data || [];
			const result: ICreditResponse = {};
			data.forEach((element: actionTypes.ICredit) => {
				let formatedDate: string = moment(element.creditDate).format("YYYY-MM");
				if (result[formatedDate]) {
					result[formatedDate].push(element);
				} else {
					result[formatedDate] = [element];
				}
			});
			dispatch({
				type: GET_ALL_CREDITS,
				payload: result
			});
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const updateCreditAction = (payload: ICreditPayload, id: string) => {
	return async () => {
		try {
			const response = await patchWithToken(`/credits/${id}`, payload);
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};
export const updateSpendsAction = (payload: IExpensePayload, id: string) => {
	return async () => {
		try {
			const response = await patchWithToken(`/spends/${id}`, payload);
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export interface ISwitchAmountPayload {
	amount: number;
	fromAccount: actionTypes.IAccount;
	toAccount: actionTypes.IAccount;
	switchDate: string;
	note?: string;
}

export const switchAmountAction = (payload: ISwitchAmountPayload) => {
	return async () => {
		try {
			const response = await patchWithToken(`/switch-amount`, payload);
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

// --------------- analytics actions --------------------
interface IMultiSeries {
	data: string[];
	name: string;
}
export interface IAnalyticsData {
	labels?: string[];
	series: string[] | IMultiSeries[];
	categories?: string[];
}

export interface IExpenseAnalyticsQuery extends ISpendQuery {
	type?: "paymentMode" | "category" | "account";
	dataType?: "object" | "analytics";
}
export const GET_EXPENSE_ANALYTICS = "GET_EXPENSE_ANALYTICS";
export interface IGetExpenseAnalyticsAction {
	type: typeof GET_EXPENSE_ANALYTICS;
	payload: IAnalyticsData;
}
export const getExpenseAnalytics = (query: IExpenseAnalyticsQuery) => {
	return async (dispatch: Dispatch) => {
		try {
			let url = `/analytics/expense?startDate=${query.startDate}&endDate=${query.endDate}`;
			const response = await getWithToken(url);
			const data = response.data || [];
			dispatch({
				type: GET_EXPENSE_ANALYTICS,
				payload: data
			});
			return data;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const GET_EXPENSE_ANALYTICS_BY_TYPE = "GET_EXPENSE_ANALYTICS_BY_TYPE";
export interface IGetExpenseAnalyticsByTypeAction {
	type: typeof GET_EXPENSE_ANALYTICS_BY_TYPE;
	payload: IAnalyticsData;
}
export const getExpenseAnalyticsByType = (query: IExpenseAnalyticsQuery) => {
	return async (dispatch: Dispatch) => {
		try {
			let url = `/analytics/type?startDate=${query.startDate}&endDate=${query.endDate}&type=${query.type ?? "category"}`;
			const response = await getWithToken(url);
			const data = response.data || [];
			dispatch({
				type: GET_EXPENSE_ANALYTICS_BY_TYPE,
				payload: data
			});
			return data;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const GET_EXPENSE_YEARLY_COMPARISION = "GET_EXPENSE_YEARLY_COMPARISION";
export interface IGetExpenseYearlyComparisionAction {
	type: typeof GET_EXPENSE_YEARLY_COMPARISION;
	payload: IAnalyticsData;
}
export const getExpenseYearlyComparision = ({ year }: { year: string }) => {
	return async (dispatch: Dispatch) => {
		try {
			let url = `/analytics/yearly_comparision?year=${year || "2024"}`;
			const response = await getWithToken(url);
			const data = response.data || [];
			dispatch({
				type: GET_EXPENSE_YEARLY_COMPARISION,
				payload: data
			});
			return data;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const GET_REMAINDERS = "GET_REMAINDERS";
export interface IGetRemaindersAction {
	type: typeof GET_REMAINDERS;
	payload: IRemainder[];
}
export interface IRemainder {
	_id?: string;
	title?: string;
	account?: string;
	category?: string;
	amount?: number;
	lastDate?: string;
	billingDate?: string;
	status?: "active" | "inactive";
	billingCycle?: "monthly" | "yearly";
	// [key: string]: any;
	isPaid?: boolean;
	isExpired?: boolean;
}
export const getRemaindersAction = () => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await getWithToken("/remainders");
			const data = response.data || [];
			dispatch({
				type: GET_REMAINDERS,
				payload: data
			});
			return data;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export interface IRemainderPayload {
	title: string;
	account: actionTypes.IAccount;
	category: actionTypes.ICategory;
	amount: number;
	lastDate: string;
	billingDate?: string;
	status: "active" | "inactive";
	billingCycle: "monthly" | "yearly";
	addExpense?: boolean;
}
export const addNewRemainderAction = (payload: IRemainderPayload) => {
	return async () => {
		try {
			const response = await postWithToken("/remainders", payload);
			const data = response.data || [];
			return data;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const updateRemainderAction = (id: string, payload: IRemainderPayload) => {
	return async () => {
		try {
			const response = await patchWithToken(`/remainders/${id}`, payload);
			const data = response.data || [];
			return data;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};
export const deleteRemainderAction = (id: string) => {
	return async () => {
		try {
			const response = await deleteWithToken(`/remainders/${id}`, {});
			const data = response.data || [];
			return data;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export interface IGetAllCategoriesAction {
	type: typeof GET_ALL_CATEGORIES;
	payload: actionTypes.ICategory[];
}
export const getAllCategoriesAction = () => {
	return async (dispatch: Dispatch) => {
		try {
			const response = await getWithToken("/categories");
			dispatch({
				type: GET_ALL_CATEGORIES,
				payload: response.data
			});
			return response;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export interface ICategoryPayload {
	title: string;
	_id?: string;
}
export const addNewCategoryAction = (payload: ICategoryPayload) => {
	return async () => {
		try {
			const response = await postWithToken("/categories", payload);
			const data = response.data || [];
			return data;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};

export const updateCategoryAction = (payload: ICategoryPayload) => {
	return async () => {
		try {
			const response = await patchWithToken(`/categories/${payload._id}`, { title: payload.title });
			const data = response.data || [];
			return data;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};
export const deleteCategoryAction = (id: string) => {
	return async () => {
		try {
			const response = await deleteWithToken(`/categories/${id}`, {});
			const data = response.data || [];
			return data;
		} catch (error) {
			console.error("error", error);
			throw error;
		}
	};
};
