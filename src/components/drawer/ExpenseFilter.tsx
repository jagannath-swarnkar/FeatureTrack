import CancelIcon from "@mui/icons-material/Cancel";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../redux/reducer";
import { getFloatingDates, getMonthsList } from "../../utils/constant";
import { removeCookie, setCookieObj } from "../../utils/cookie";
import { IAnyObject, IExpenseFilters } from "../../utils/types";
import HideComponentWrapper from "../HideComponentWrapper";
import DateInput from "../input-field/DateInput";
import DrawerWrapper from "./DrawerWrapper";
type Props = {
	handleApply: (filters: IExpenseFilters) => void;
	page: "spends" | "credits";
	onClose: () => void;
	open: boolean;
};
enum enumFilterCategory {
	accounts = "accounts",
	category = "category",
	dateRange = "dateRange",
	paymentMode = "paymentMode"
}

const ExpenseFilter = (props: Props) => {
	const { accounts, categories } = useSelector((store: ReduxStore) => store.State);

	const [filters, setFilters] = useState<IAnyObject>({
		accounts: [],
		category: [],
		startDate: "",
		endDate: ""
	});
	const [monthsList, setMonthsList] = useState<IAnyObject[]>([]);
	const [showDateRange, setShowDateRange] = useState<boolean>(false);
	const [floatingDates, setFloatingDates] = useState<IAnyObject[]>([]);

	useEffect(() => {
		const monthsLst = getMonthsList();
		setMonthsList(monthsLst);
		const flDts = getFloatingDates();
		setFloatingDates(flDts);
	}, []);

	const handleSelect = (item: string, cat: enumFilterCategory) => {
		let filterItem = filters[cat];
		if (filterItem.includes(item)) {
			filterItem = filterItem.filter((f: string) => f !== item);
		} else {
			filterItem.push(item);
		}
		setFilters({ ...filters, [cat]: filterItem });
	};
	const handleSelectMonth = (item: IAnyObject, cat: enumFilterCategory) => {
		let filterItem: IAnyObject = { ...filters };
		if (filterItem.startDate === item.startDate && filterItem.endDate === item.endDate) {
			filterItem.startDate = "";
			filterItem.endDate = "";
		} else {
			filterItem.startDate = item.startDate;
			filterItem.endDate = item.endDate;
		}
		console.log("filterItem", filterItem);
		setFilters({ ...filterItem });
	};
	const handleSelectStartDate = (date: any, type: any) => {
		const dateRangIns = filters;
		dateRangIns.startDate = date;
		if (!dateRangIns.endDate) {
			dateRangIns.endDate = moment().format("YYYY-MM-DD");
		}
		setFilters({ ...filters, ...dateRangIns });
	};
	const handleSelectEndDate = (date: any, type: any) => {
		setFilters({ ...filters, endDate: date });
	};
	const hanldeSubmitFilter = () => {
		const payload: IExpenseFilters = {
			accounts: filters.accounts,
			category: filters.category,
			startDate: filters.startDate,
			endDate: filters.endDate
		};
		props.handleApply(payload);
		setCookieObj("filters", payload);
	};
	const handleClear = () => {
		const today = moment().add(1, "day").format("YYYY-MM-DD");
		const monthStart = moment().startOf("month").format("YYYY-MM-DD");
		setFilters({
			accounts: [],
			category: [],
			startDate: monthStart,
			endDate: today
		});
		removeCookie("filters");
		props.handleApply({ accounts: [], category: [], startDate: monthStart, endDate: today });
	};
	return (
		<DrawerWrapper open={props.open} handleClose={props.onClose}>
			<div className="drawer-cont vh-80 pt-0">
				<div className="d-flex justify-content-between drawer-header">
					<h3 className="text-capitalize font-medium mt-0">Filter {props.page}</h3>
					<CancelIcon onClick={props.onClose} className="text-muted" />
				</div>
				<section className="filter-section">
					<div className="title">Payment Source</div>
					<div className="filter-section-body">
						<ul>
							{accounts.map((item, index) => (
								<li
									key={index}
									onClick={() => handleSelect(item.title, enumFilterCategory.accounts)}
									className={`${filters.accounts.includes(item.title) ? "active" : ""}`}
								>
									{item.title}
								</li>
							))}
						</ul>
					</div>
				</section>
				<br />
				<section className="filter-section">
					<div className="title">Category</div>
					<div className="filter-section-body">
						<ul>
							{categories.map((item, index) => (
								<li
									key={index}
									onClick={() => handleSelect(item.title, enumFilterCategory.category)}
									className={`${filters.category.includes(item.title) ? "active" : ""}`}
								>
									{item.title}
								</li>
							))}
						</ul>
					</div>
				</section>
				<br />
				<section className="filter-section">
					<div className="title">Months</div>
					<div className="filter-section-body">
						<ul>
							{monthsList.map((item, index) => (
								<li
									key={index}
									onClick={() => handleSelectMonth(item, enumFilterCategory.dateRange)}
									className={`${filters.startDate === item.startDate && filters.endDate === item.endDate ? "active" : ""}`}
								>
									{item.name}
								</li>
							))}
						</ul>
					</div>
					<br />
					<div className="title">Floating Dates</div>
					<div className="filter-section-body">
						<ul>
							{floatingDates.map((item, index) => (
								<li
									key={index}
									onClick={() => handleSelectMonth(item, enumFilterCategory.dateRange)}
									className={`${filters.startDate === item.startDate && filters.endDate === item.endDate ? "active" : ""}`}
								>
									{item.name}
								</li>
							))}
						</ul>
					</div>

					<button onClick={() => setShowDateRange(true)} className="btn btn-link mt-3 mb-2">
						Filter by Date Range
					</button>
					<HideComponentWrapper show={showDateRange}>
						<div className="d-flex gap-3">
							<DateInput
								value={filters.startDate}
								onChange={handleSelectStartDate}
								label=""
								required={false}
								id="expenseDate"
								name="expenseDate"
								placeholder="Start Date"
								disalbleTime={true}
								className="filter-section"
								floatingLabel="End Date"
								format="YYYY-MM-DD"
							/>
							<DateInput
								value={filters.endDate}
								onChange={handleSelectEndDate}
								label=""
								required={false}
								id="expenseDate"
								name="expenseDate"
								placeholder="End Date"
								disalbleTime={true}
								className="filter-section"
								floatingLabel="End Date"
								format="YYYY-MM-DD"
							/>
						</div>
					</HideComponentWrapper>
				</section>
				<br />
				<br />
				<br />
				<br />
				<div className="expense-filter-footer d-flex justify-content-between ">
					<button onClick={handleClear} className="btn btn-secondary line px-4">
						Clear Filter
					</button>
					<button onClick={hanldeSubmitFilter} className="btn btn-primary px-4">
						Apply
					</button>
				</div>
			</div>
		</DrawerWrapper>
	);
};

export default ExpenseFilter;
