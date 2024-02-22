import React, { ChangeEvent, FC, useState } from "react";
import { Button, Input, Space, Typography, message } from "antd";
import { CheckOutlined, EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditHeader.module.scss";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { useDispatch } from "react-redux";
import { changeTitle } from "../../../store/PageInfoReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { updateQuestionService } from "../../../services/question";
const { Title } = Typography;

// 问卷标题
const EditTitleElem: FC = () => {
	const { title } = useGetPageInfo();
	const [editState, setEditState] = useState(false);
	const dispatch = useDispatch();
	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const newTitle = event.target.value.trim();
		if (!newTitle) return;
		dispatch(changeTitle(newTitle));
	}
	if (editState) {
		return (
			<Input
				value={title}
				onChange={handleChange}
				onPressEnter={() => setEditState(false)}
				onBlur={() => setEditState(false)}
			></Input>
		);
	}
	return (
		<Space>
			<Title>{title}</Title>
			<Button icon={<EditOutlined />} onClick={() => setEditState(true)} type="text" />
		</Space>
	);
};

// 保存按钮
const SaveButton: FC = () => {
	const { id } = useParams();
	const { componentList = [] } = useGetComponentInfo();
	const pageInfo = useGetPageInfo();
	const { loading, run: save } = useRequest(
		async () => {
			if (!id) return;
			await updateQuestionService(id, { ...pageInfo, componentList });
		},
		{ manual: true }
	);
	// 自动保存
	useDebounceEffect(
		() => {
			save();
		},
		[componentList, pageInfo],
		{
			wait: 1000,
		}
	);
	useKeyPress(["ctrl.s", "meta.s"], (event: KeyboardEvent) => {
		event.preventDefault();
		if (!loading) save();
	});
	return (
		<Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : <CheckOutlined />}>
			保存
		</Button>
	);
};

// 发布按钮
const PublishButton: FC = () => {
	const nav = useNavigate();
	const { id } = useParams();
	const { componentList } = useGetComponentInfo();
	const pageInfo = useGetPageInfo();
	const { loading, run: pub } = useRequest(
		async () => {
			if (!id) return;
			await updateQuestionService(id, {
				componentList,
				...pageInfo,
				isPublished: true, // 标识问卷已经发布了
			});
		},
		{
			manual: true,
			onSuccess() {
				message.success("发布成功");
				nav(`/question/stat/{$id}`);
			},
		}
	);
	return (
		<Button onClick={pub} disabled={loading} type="primary">
			发布
		</Button>
	);
};
const EditHeader: FC = () => {
	const nav = useNavigate();
	return (
		<div className={styles["header-wrapper"]}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
							返回
						</Button>
						<EditTitleElem />
					</Space>
				</div>
				<div className={styles.main}>
					<EditToolbar />
				</div>
				<div className={styles.right}>
					<Space>
						<SaveButton />
						<PublishButton />
					</Space>
				</div>
			</div>
		</div>
	);
};
export default EditHeader;
