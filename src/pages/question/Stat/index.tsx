import React, { FC, useState } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useNavigate } from "react-router-dom";
import { useTitle } from "ahooks";
import { Button, Result } from "antd";
import StatHeader from "./StatHeader";
import ComponentList from "./ComponentList";
import PageStat from "./PageStat";
import ChartStat from "./ChartStat";
import styles from "./index.module.scss";
const Stat: FC = () => {
	const nav = useNavigate();
	const { loading } = useLoadQuestionData();
	const { isPublished, title } = useGetPageInfo();

	// 状态提升
	const [selectedComponentId, setSelectedComponentId] = useState("");
	const [selectedComponentType, setSelectedComponentType] = useState("");

	useTitle(`问卷编辑 - ${title}`);
	const genContentElem = () => {
		if (typeof isPublished === "boolean" && !isPublished) {
			return (
				<div style={{ flex: "1" }}>
					<Result
						status="warning"
						title="该问卷尚未发布"
						extra={
							<Button type="primary" onClick={() => nav(-1)}>
								返回上一页
							</Button>
						}
					></Result>
				</div>
			);
		}
		return (
			<>
				<div className={styles.left}>
					<ComponentList
						selectedComponentdId={selectedComponentId}
						setSelectedComponentId={setSelectedComponentId}
						setSelectedCompoentType={setSelectedComponentType}
					/>
				</div>
				<div className={styles.main}>
					<PageStat
						selectedComponentdId={selectedComponentId}
						setSelectedComponentId={setSelectedComponentId}
						setSelectedCompoentType={setSelectedComponentType}
					/>
				</div>
				<div className={styles.right}>
					<ChartStat selectedComponentId={selectedComponentId} selectedComponentType={selectedComponentType} />
				</div>
			</>
		);
	};

	return (
		<div className={styles.container}>
			<div>
				<StatHeader />
			</div>
			<div className={styles["container-wrapper"]}>
				{!loading && <div className={styles.content}>{genContentElem()}</div>}
			</div>
		</div>
	);
};

export default Stat;
