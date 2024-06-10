/**
 * @description use this method to set cookie
 * @author Jagannath
 * @date 17/09/2021
 * @param name name of the key to store in cookie
 * @param value value of the key
 * @return boolean
 */
export function setCookie(name: string, value: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		localStorage.setItem(name, value);
		resolve(true);
	});
}

/**
 * @description use this method to get cookie
 * @author Jagannath
 * @date 17-09-2021
 * @param name key name
 * @return string
 */
export function getCookie(name: string): string {
	return localStorage.getItem(name) || "";
}

export const removeCookie = (name: string) => {
	return new Promise((resolve, reject) => {
		localStorage.removeItem(name);
		resolve(true);
	});
};

export const clearSession = () => {
	return new Promise((resolve, reject) => {
		localStorage.clear();
		resolve(true);
	});
};

export const setCookieObj = (name: string, value: object | any[]) => {
	return new Promise((resolve, reject) => {
		localStorage.setItem(name, JSON.stringify(value));
		resolve(true);
	});
};
export const getCookieObj = (name: string, defaultValue = "{}") => {
	let cookieObj = localStorage.getItem(name) || defaultValue;
	return JSON.parse(cookieObj);
};
