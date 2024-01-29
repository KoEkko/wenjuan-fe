import React, { FC, useEffect, useRef, useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import { useTitle, useDebounceFn, useRequest } from "ahooks";
import { getQuestionListService } from "../../services/question";
import { Typography, Spin, Empty } from "antd";
import styles from "./common.module.scss";
import ListSerch from "../../components/ListSearch";
import { useSearchParams } from "react-router-dom";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";

const { Title } = Typography;
const List: FC = () => {
	useTitle("问卷 - 我的问卷");
	const [startLoading, setStartLoding] = useState(false);
	const [page, setPage] = useState(1); // List内部的数据，不在 url 参数中体现
	const [list, setList] = useState([]); // 全部的列表数据，上划加载更多，累计
	const [total, setTotal] = useState(0);
	const [searchParams] = useSearchParams();
	const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
	// keyword 变化时，重置信息
	useEffect(() => {
		setStartLoding(false);
		setPage(1);
		setList([]);
		setTotal(0);
	}, [keyword]);
	const haveMoreData = total > list.length;
	const containerRef = useRef<HTMLDivElement>(null);
	const { run: load, loading } = useRequest(
		async () => {
			const data = await getQuestionListService({
				page,
				pageSize: LIST_PAGE_SIZE,
				keyword,
			});
			return data;
		},
		{
			manual: true,
			onSuccess(result) {
				const { list: l = [], total = 0 } = result;
				setList(list.concat(l));
				setTotal(total);
				setPage(page + 1);
			},
		}
	);
	// 触发加载
	const { run: tryLoadMore } = useDebounceFn(
		() => {
			const elem = containerRef.current;
			if (elem === null) return;
			const domRect = elem.getBoundingClientRect();
			if (domRect === null) return;
			const { bottom } = domRect;
			const clientHeight = document.body.clientHeight;
			if (bottom <= clientHeight) {
				load();
				setStartLoding(true);
			}
		},
		{
			wait: 1000,
		}
	);
	// 1.当页面加载，或者url 参数变化时，触发加载
	useEffect(() => {
		tryLoadMore();
	}, [searchParams]);
	// 2.当页面滚动时，要尝试触发加载
	useEffect(() => {
		if (haveMoreData) {
			window.addEventListener("scroll", tryLoadMore);
		}
		return () => {
			window.removeEventListener("scroll", tryLoadMore);
		};
	}, [searchParams, haveMoreData]);
	function loadMoreContentElem() {
		if (startLoading || loading) return <Spin />;
		if (total === 0) return <Empty />;
		if (!haveMoreData) return <span>没有更多数据了...</span>;
		return <span>开始加载下一页</span>;
	}
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>我的问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSerch />
				</div>
			</div>
			<div className={styles.content}>
				{list.length > 0 &&
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					list.map((item: any) => {
						const { _id } = item;
						return <QuestionCard key={_id} {...item}></QuestionCard>;
					})}
			</div>
			<div className={styles.footer}>
				<div ref={containerRef}>{loadMoreContentElem()}</div>
			</div>
		</>
	);
};

export default List;
