import type { Meta, StoryObj } from "@storybook/react";
import QuestionCheckBox from "../../components/QuestionComponents/QuestionCheckBox/Component";

const meta = {
	title: "Question/QuestionCheckBox",
	component: QuestionCheckBox,
} satisfies Meta<typeof QuestionCheckBox>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {},
};
const list = [
	{ value: "v1", text: "t1", checked: true },
	{ value: "v2", text: "t2", checked: false },
	{ value: "v3", text: "t3", checked: true },
];
export const SetProps: Story = {
	args: {
		title: "hello",
		list,
	},
};
