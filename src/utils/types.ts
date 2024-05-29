export interface ILoginPayload {
	email: string;
	password: string;
}
export interface ISelectInput {
	label: string;
	value: any;
	[key: string]: any;
}
export enum IDrawersNames {
	ALL = "ALL",
	OPEN_DIALOG = "OPEN_DIALOG",
	CLOSE_DIALOG = "CLOSE_DIALOG",
	NEWSPAPER_DRAWER = "NEWSPAPER_DRAWER",
	SIDEBAR = "SIDEBAR"
}

type TAnchor = "left" | "right" | "top" | "bottom";

export interface IDrawerProps {
	Name: IDrawersNames;
	DrawerData: any;
	Anchor?: TAnchor;
	maxWidth?: string;
	onClose?: any;
}
export interface IPagination {
	totalCount: number;
	page: number;
}

export interface IDefaultQuery {
	page?: number;
	search?: string;
}

export enum RoutesEnum {
	login = "/login",
	home = "/",
	profile = "/profile",
	analytics = "/analytics",
	credits = "/credits",
	create = "/create",
	addExpense = "/add-expense",
	addCredit = "/add-credit",
	editSpend = "/edit-spend",
	editCredit = "/edit-credit",
	switchAmount = "/switch-amount",
	remainders = "/remainders",
	categories = "/categories"
}
export enum HashtagDetailsRoute {
	top_influencers = "top-influencers",
	top_posts = "top-posts",
	profile_analysis = "profile-analysis",
	hashtag_reports = "hashtag-reports",
	media_wall = "media-wall"
}
export type IBreadcrumb = {
	title: string;
	path: string;
	active?: boolean;
	disabled?: boolean;
};

export interface IProduct {
	name: string;
	quantity?: number | null;
	price?: number;
	amount: number;
	[title: string]: any;
}
export enum ProductEnum {
	name = "name",
	quantity = "quantity",
	price = "price",
	amount = "amount"
}

export interface IInvoiceData {
	customer: ICustomer;
	products: IProduct[];
}
export interface ICustomer {
	name?: string;
	phone?: string;
	email?: string;
}

export interface ISpend {
	_id: string;
	title: string;
	category: string;
	expenseDate: string;
	amount: number;
	account: string;
	createdAt: string;
	note: string;
}
export interface ICredit {
	_id: string;
	title: string;
	category: string;
	creditDate: string;
	amount: number;
	account: string;
	createdAt: string;
	note: string;
}
export interface IAnyObject {
	[key: string]: any;
}

export interface IApiOutput<T> {
	data: T;
	status: number;
}

export interface IExpenseFilters {
	accounts: string[];
	category: string[];
	startDate?: string;
	endDate?: string;
}

export interface ICategory {
	_id: string;
	title: string;
	userId?: string;
	createdAt?: string;
}
export interface IAccount {
	_id?: string;
	title: string;
	userId?: string;
	createdAt?: string;
}
