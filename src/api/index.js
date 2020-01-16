import request from "../utils/request";

export const fetchData = query => {
	return request({
		url: "table/",
		method: "get",
		params: query
	});
};
export const getRMSData = query => {
	return request({
		url: "api/rmslist/",
		method: "get",
		params: query
	});
};
export const queryTable = query => {
	return request({
		url: "queryTable/",
		method: "get",
		params: JSON.stringify(query)
	});
};
export const deleteData = query => {
	return request({
		url: "queryTable/",
		method: "delete",
		params: query
	});
};
