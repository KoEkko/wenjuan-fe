import React, { FC } from "react";
import { Typography } from "antd";
import { type QuestionTitlePropsType, QuestionTitleDefaultProps } from "./interface";
const { Title } = Typography;
const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
	const { text = "", level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props };
	const genFontSize = (level: number) => {
		const fontSizeMap: { [key: number]: string } = {
			1: "24px",
			2: "20px",
			3: "16px",
		};
		return fontSizeMap[level] ? fontSizeMap[level] : "16px";
	};
	return (
		<div>
			<Title
				level={level}
				style={{ textAlign: isCenter ? "center" : "start", marginBottom: "0", fontSize: genFontSize(level) }}
			>
				{text}
			</Title>
		</div>
	);
};

export default QuestionTitle;
