import React, { FC } from "react";
import QuestionCard from "../../components/QuestionCard";
import { useTitle } from "ahooks";
import { Empty, Typography, Spin } from "antd";
import styles from "./common.module.scss";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListSerch from "../../components/ListSearch";
import ListPage from "../../components/ListPage";

const { Title } = Typography;

const Star: FC = () => {
	useTitle("小慕问卷 - 星标问卷");
	const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
	const { list: questionList = [], total = 0 } = data;
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>星标问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSerch />
				</div>
			</div>
			<div className={styles.content}>
				{loading && (
					<div style={{ textAlign: "center" }}>
						<Spin />
					</div>
				)}
				{!loading && questionList.length === 0 ? (
					<Empty description="暂无数据" />
				) : (
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					questionList.map((item: any) => {
						const { _id } = item;
						return <QuestionCard key={_id} {...item} />;
					})
				)}
			</div>
			<div className={styles.footer}>
				<ListPage total={total} />
			</div>
		</>
	);
};

export default Star;
