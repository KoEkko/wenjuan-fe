import React, { FC } from "react";
import { Typography, Space, Checkbox } from "antd";
import { QuestionCheckBoxPropsType, QuestionCheckBoxDefaultProps } from "./interface";
const { Paragraph } = Typography;
const QuestionCheckBox: FC<QuestionCheckBoxPropsType> = (props: QuestionCheckBoxPropsType) => {
	const { title, isVertical, list = [] } = { ...QuestionCheckBoxDefaultProps, ...props };
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<Space direction={isVertical ? "vertical" : "horizontal"}>
				{list.map((l) => {
					const { value, text, checked } = l;
					return (
						<Checkbox key={value} value={value} checked={checked}>
							{text}
						</Checkbox>
					);
				})}
			</Space>
		</div>
	);
};
export default QuestionCheckBox;
