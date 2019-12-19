import request from "../utils/request";

export const fetchData = query => {
	return request(
		{
			url: "../../static/table.json",
			method: "get",
			params: query
		},
		{
			url: "../../static/type.json",
			method: "get",
			params: query
		}
	);
};
