const KEY = "USER_TOKEN";

export const setToken = (token: string) => {
	localStorage.setItem(KEY, token);
};
export const getToken = () => {
	localStorage.getItem(KEY);
};
export const removeToken = () => {
	localStorage.removeItem(KEY);
};
