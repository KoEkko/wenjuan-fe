import React, { FC, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Input } from "antd";
import { LIST_SEARCH_PARAM_KEY } from "../constant";

const { Search } = Input;
const ListSerch: FC = () => {
	const [search, setSerch] = useState<string>("");
	const nav = useNavigate();
	const { pathname } = useLocation();
	// 获取URL参数，并设置到input value
	const [searchParams] = useSearchParams();
	useEffect(() => {
		const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
		setSerch(newVal);
	}, [searchParams]);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSerch(event.target.value);
	};
	const handleSearch = (searchValue: string) => {
		nav({
			pathname,
			search: `${LIST_SEARCH_PARAM_KEY}=${searchValue}`, // 只带上 keyword
		});
	};
	return (
		<>
			<Search
				value={search}
				onSearch={handleSearch}
				onChange={handleChange}
				size="large"
				allowClear
				style={{ width: "240px" }}
			/>
		</>
	);
};

export default ListSerch;
