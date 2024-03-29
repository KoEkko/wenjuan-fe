import React, { FC } from "react";
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from "./interface";
import { Typography } from "antd";
const { Paragraph } = Typography;
const QuestionParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
	const { text = "", isCenter = false } = { ...QuestionParagraphDefaultProps, ...props };
	const textList = text.split("\n");

	return (
		<Paragraph style={{ textAlign: isCenter ? "center" : "start", marginBottom: 0 }}>
			{textList.map((t, index) => {
				return (
					<span key={index}>
						{index > 0 && <br />}
						{t}
					</span>
				);
			})}
		</Paragraph>
	);
};

export default QuestionParagraph;
