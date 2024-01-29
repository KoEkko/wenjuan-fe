import React, { FC, useState } from "react";
import { useRequest, useTitle } from "ahooks";
import { Empty, Table, Tag, Typography, Space, Button, Modal, message, Spin } from "antd";
import styles from "./common.module.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListSerch from "../../components/ListSearch";
import ListPage from "../../components/ListPage";
import { deleteQuestionsService, updateQuestionService } from "../../services/question";

const { Title } = Typography;
const { confirm } = Modal;

const tableColumns = [
	{
		title: "标题",
		dataIndex: "title",
	},
	{
		title: "是否发布",
		dataIndex: "isPublished",
		render: (isPubilshed: boolean) => {
			return isPubilshed ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>;
		},
	},
	{
		title: "答卷数量",
		dataIndex: "answerCount",
	},
	{
		title: "创建时间",
		dataIndex: "createdAt",
	},
];

const Trash: FC = () => {
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	useTitle("小慕问卷 - 回收站");
	const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true });
	const { list: questionList = [], total = 0 } = data;

	const { run: recover } = useRequest(
		async () => {
			for await (const id of selectedKeys) {
				await updateQuestionService(id, { isDeleted: false });
			}
		},
		{
			manual: true,
			debounceWait: 500, // 防抖
			onSuccess() {
				message.success("恢复成功");
				refresh(); //手动刷新列表
				setSelectedKeys([]);
			},
		}
	);
	const { run: deleteQuestion } = useRequest(async () => await deleteQuestionsService(selectedKeys), {
		manual: true,
		onSuccess() {
			message.success("删除成功");
			refresh();
			setSelectedKeys([]);
		},
	});
	const del = () => {
		confirm({
			title: "确认彻底删除该问卷?",
			icon: <ExclamationCircleOutlined />,
			content: "删除该问卷后不可恢复",
			onOk: deleteQuestion,
		});
	};
	const TableElement = (
		<>
			<div style={{ marginBottom: "16px" }}>
				<Space>
					<Button type="primary" disabled={selectedKeys.length === 0} onClick={recover}>
						恢复
					</Button>
					<Button danger disabled={selectedKeys.length === 0} onClick={del}>
						彻底删除
					</Button>
				</Space>
			</div>
			<Table
				dataSource={questionList}
				columns={tableColumns}
				pagination={false}
				rowKey={(q) => q._id}
				rowSelection={{
					type: "checkbox",
					onChange: (selectRowKeys) => {
						setSelectedKeys(selectRowKeys as string[]);
					},
				}}
			/>
		</>
	);
	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>回收站</Title>
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
				{!loading && questionList.length === 0 && <Empty description="暂无数据" />}
				{questionList.length > 0 && TableElement}
			</div>
			<div className={styles.footer}>
				<ListPage total={total} />
			</div>
		</>
	);
};

export default Trash;
