import moment from "moment";
import * as iconsJSON from "./icons.json";
import {
	CLOUDINARY_API_BASE,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_UPLOAD_PRESET,
	EMAIL_REGEX,
	MEDIA_DIRECTORY,
	PASSWORD_REGEX,
	URL_REGEX
} from "./config";
import { removeCookie } from "./cookie";
import { DialogClose, DialogOpen, DrawerClose, DrawerOpen, InvoiceWrapper, PagerLoader } from "./rxSubjects";
import { IAnyObject, IDrawerProps, IDrawersNames, IInvoiceData } from "./types";
import { iconsList } from "./constant";

/**
 * @description use this method to pause a task for sometime
 * @author jagannath
 * @date 09/09/2021
 * @param time time in milliseconds
 * @return Promise()
 */
export const sleep = (time: number) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});

/**
 * @description use this method to parse query params
 * @author jagannath
 * @date 09/09/2021
 * @param param url query params - search params
 * @return ex: {key: value}
 */
export const parseQuery = (query: string): any => {
	query = query.trim().replace(/^[?#&]/, "");
	const queryParam: any = {};
	for (const param of query.split("&")) {
		if (param === "") {
			continue;
		}
		let [key, value] = param.split("=");
		queryParam[key] = value;
	}
	return queryParam;
};

/**
 * @description use this method to parse url pathname (routes into an array)
 * @author jagannath
 * @date 09/09/2021
 * @param param url pathname
 * @return string[] - ex: ["signup", "merchant"]
 */
export const parseParam = (param: string): string[] => {
	param = param.trim().replace(/^[/#&]/, "");
	return param.split("/");
};
export const clearAll = () => {
	removeCookie("refreshToken");
	removeCookie("accessExpiry");
	removeCookie("token");
	removeCookie("uid");
	removeCookie("auth");
};

/**
 * @description use this method to start full page loader
 * @author jagannath
 * @date 30/12/2021
 */
export const startLoader = () => {
	return PagerLoader.next(true);
};
export const ParseToken = (token: string) => {
	return decodeURIComponent(token).replace(/%20/g, " ");
};

/**
 * @description use this method to stop full page loader
 * @author jagannath
 * @date 30/12/2021
 */
export const stopLoader = () => {
	return PagerLoader.next(false);
};

export const showInvoice = (data: IInvoiceData) => {
	return InvoiceWrapper.next({ flag: true, data });
};
export const removeInvoice = () => {
	return InvoiceWrapper.next({ flag: false });
};

/**
 * @description this method is to get a classname inserted into the element if field is invalid on blur
 * @author Jagan
 * @date 23-11-2021
 * @param e: react event (onblur)
 */
export const handleValidate = (e: any) => {
	if ((!e.target.value || e.target.value == 0) && e.target.required) {
		e.target.classList.add("field-invalid");
	} else if (e.target.type === "email") {
		if (!e.target.value.match(EMAIL_REGEX)) {
			e.target.classList.add("field-invalid");
		} else {
			e.target.classList.remove("field-invalid");
		}
	} else {
		e.target.classList.remove("field-invalid");
		e.target.classList.add("field-validated");
	}
};

/**
 * @description use this method to validate email with regex
 * @author jagannath
 * @date 05/01/2022
 * @param value string - email
 * @return {*} boolean
 */
export const validateEmail = (value: string): boolean => {
	if (!value) return false;
	return !!value.match(EMAIL_REGEX);
};
export const validateUrl = (value: string): boolean => {
	if (!value) return false;
	return !!value.match(URL_REGEX);
};
/**
 * @description use this method to validate email with regex
 * @author jagannath
 * @date 05/01/2022
 * @param value string - email
 * @return {*} boolean
 */
export const validatePassword = (value: string): boolean => {
	return !!value.match(PASSWORD_REGEX);
};

export const scrollTop = () => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
};

/**
 * @param item "$10-000"
 * @returns number - 10000
 */
export const parseToNumber = (item: string | number): number => {
	const number = String(item);
	if (number.includes("$")) {
		return Number(number.split("$")[1].split(",").join(""));
	} else if (number.includes("-")) {
		return Number(number.split("-").join(""));
	} else {
		return Number(item);
	}
};

/**
 * @description use this method to get how many days ago
 * @author jagannath
 * @date 12/05/2022
 * @param date string - yyyy-MM-Dd
 * @returns number - 25
 */
export const daysAgo = (date: any): number => {
	let last_day = new Date(date);
	let today = new Date();
	let one_day = 1000 * 60 * 60 * 24;
	let days = Math.ceil((today.getTime() - last_day.getTime()) / one_day);
	return days;
};

/**
 * @description use this method to get how many days ago
 * @author jagannath
 * @date 12/05/2022
 * @param date string - yyyy-MM-Dd
 * @returns number - 25
 */
export const hoursAgo = (date: any): number => {
	let last_time = new Date(date);
	let today = new Date();
	let one_hour = 1000 * 60 * 60;
	let hours = Math.ceil((today.getTime() - last_time.getTime()) / one_hour);
	return hours;
};

export const scroollIntoHeight = (id: string, offset: number) => {
	try {
		const element: any = document.getElementById(id);
		const bodyRect = document.body.getBoundingClientRect().top;
		const elementRect = element.getBoundingClientRect().top;
		const elementPosition = elementRect - bodyRect;
		const offsetPosition = elementPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth"
		});
	} catch (error) {
		console.log("error", error);
	}
};

export const getBase64UrlFromFile = (file: any) => {
	try {
		let payload: any = {
			name: file.name,
			type: file.type,
			file: file,
			base64: null
		};
		let reader = new FileReader();
		reader.readAsDataURL(file);
		return (reader.onloadend = () => {
			payload.base64 = reader.result;
			return payload;
		})();
	} catch (error) {
		console.log("error", error);
	}
};

/**
 * @description use this method to formate phone number to us formate
 * @author jagannath
 */
export const formatePhoneNumber = (number: string): string => {
	if (!number) {
		return "";
	} else if (number.includes("+1")) {
		return number;
	}
	return number.replace(/\D+/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "+1 ($1) $2-$3");
};

/**
 * @description use this method to generate google map link using lat long
 * @author jagannath
 */
export const getGoogleMapLink = (lat: number | string, long: number | string): string => `http://maps.google.com/?q=${lat},${long}&output=embed`;

export const get_browser = () => {
	var ua = navigator.userAgent,
		tem,
		M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return { name: "IE", version: tem[1] || "" };
	}
	if (M[1] === "Chrome") {
		tem = ua.match(/\bOPR|Edge\/(\d+)/);
		if (tem != null) {
			return { name: "Opera", version: tem[1] };
		}
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) {
		M.splice(1, 1, tem[1]);
	}
	return {
		name: M[0],
		version: M[1]
	};
};

export const openDialog = (data: IDrawerProps) => {
	return DialogOpen.next(data);
};

export const closeDialog = (Name: IDrawersNames) => {
	return DialogClose.next(Name);
};

export const openDrawer = (data: IDrawerProps) => {
	return DrawerOpen.next(data);
};

export const closeDrawer = (Name: IDrawersNames) => {
	return DrawerClose.next(Name);
};

export const detectMobileDevice = () => {
	let isMobileViewServer = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i);

	return Boolean(isMobileViewServer);
};

export const scrollToTop = (id?: string) => {
	document.getElementById(id || "strip")?.scrollIntoView();
};

export const UploadImage = async (file: any) => {
	try {
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
		data.append("folder", `${MEDIA_DIRECTORY}`);
		const apiUrl = `${CLOUDINARY_API_BASE}${CLOUDINARY_CLOUD_NAME}/image/upload/`;
		const res = await fetch(apiUrl, {
			method: "POST",
			body: data
		});
		const resultJson = await res.json();
		return resultJson.secure_url;
	} catch (error) {
		console.error("failed to upload image: ", error);
		return null;
	}
};

export const transactionTime = (date: string) => {
	const momentDate = moment(date);
	if (momentDate.isSame(moment(), "day")) {
		return "Today";
	} else if (momentDate.isSame(moment().subtract(1, "day"), "day")) {
		return "Yesterday";
	} else {
		return momentDate.format("dddd, DD MMM YYYY");
	}
};

export const getGreetingMessage = () => {
	const hour = moment().hour();
	if (hour < 12) {
		return "Good Morning";
	} else if (hour < 17) {
		return "Good Afternoon";
	} else {
		return "Good Evening";
	}
};

export const showAmount = (amount: number | string = 0): string => {
	const locale = "en-IN";
	return amount.toLocaleString(locale, { style: "currency", currency: "INR", minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

export const formatIndianCurrency = (amount: number) => {
	const formatter = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		notation: "compact",
		compactDisplay: "short"
	});
	return formatter.format(amount);
};
export const formatText = (text: any) => {
	return text
		.replace(/_/g, " ")
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
		.replace(/\b\w/g, (char: any) => char.toUpperCase());
};

export const findItemFromTitle = (title: string = "") => {
	// Split the title into words
	const words = title.toLowerCase().split(" ") || [];
	const icons: IAnyObject = iconsJSON;
	// Iterate through each word and check if it matches any product name
	for (const word of words) {
		if (icons[word]) {
			return {
				item: word,
				icon: icons[word]
			};
		}
	}

	return null; // Return null if no matching item found
};

export const getAccountIcon = (title: any, defaultIcon?: any) => {
	console.log("title", title);
	const words = title?.toLowerCase().split(" ") || [];
	const icons: IAnyObject = Object.keys(iconsList);
	for (const word of words) {
		if (icons.includes(word)) {
			let icon = iconsList[word] || defaultIcon || iconsList.cash;
			return icon;
		}
	}
	return defaultIcon || iconsList.cash;
};
