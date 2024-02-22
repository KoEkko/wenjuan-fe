import React, { FC, useMemo, useRef } from "react";
import styles from "./StatHeader.module.scss";
import { Button, Input, InputRef, Popover, Space, Tooltip, Typography, message } from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import useGetPageInfo from "../../../hooks/useGetPageInfo";

const { Title } = Typography;
const StatHeader: FC = () => {
	const nav = useNavigate();
	const { id } = useParams();
	const { title, isPublished } = useGetPageInfo();
	const urlInputRef = useRef<InputRef>(null);
	function copy() {
		const elem = urlInputRef.current;
		if (elem === null) return;
		elem.select(); // 选中
		document.execCommand("copy");
		message.success("拷贝成功");
	}
	// function genLinkAndQRCodeElem() {
	// 	if (!isPublished) return;
	// 	// 拼接URL, 需要参考 C 端的规则
	// 	const url = `http://localhost:8000/question/edit/${id}`;
	// 	// 定义二维码组件
	// 	const QRCodeElem = (
	// 		<div style={{ textAlign: "center" }}>
	// 			<QRCode value={url} size={150} />
	// 		</div>
	// 	);
	// 	return (
	// 		<Space>
	// 			<Input value={url} style={{ width: "300px" }} ref={urlInputRef} />
	// 			<Tooltip title="拷贝链接">
	// 				<Button icon={<CopyOutlined />} onClick={copy} />
	// 			</Tooltip>
	// 			<Popover content={QRCodeElem}>
	// 				<Button icon={<QrcodeOutlined />} />
	// 			</Popover>
	// 		</Space>
	// 	);
	// }
	// 使用 useMemo 1.依赖项是否经常变化 2. 缓存的元素是否创建成功较高
	const LinkAndQRCodeElem = useMemo(() => {
		if (!isPublished) return;
		// 拼接URL, 需要参考 C 端的规则
		const url = `http://localhost:8000/question/edit/${id}`;
		// 定义二维码组件
		const QRCodeElem = (
			<div style={{ textAlign: "center" }}>
				<QRCode value={url} size={150} />
			</div>
		);
		return (
			<Space>
				<Input value={url} style={{ width: "300px" }} ref={urlInputRef} />
				<Tooltip title="拷贝链接">
					<Button icon={<CopyOutlined />} onClick={copy} />
				</Tooltip>
				<Popover content={QRCodeElem}>
					<Button icon={<QrcodeOutlined />} />
				</Popover>
			</Space>
		);
	}, [id, isPublished]);

	return (
		<div className={styles["header-wrapper"]}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
							返回
						</Button>
						<Title>{title}</Title>
					</Space>
				</div>
				<div className={styles.main}>{LinkAndQRCodeElem}</div>
				<div className={styles.right}>
					<Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
						编辑问卷
					</Button>
				</div>
			</div>
		</div>
	);
};
export default StatHeader;
