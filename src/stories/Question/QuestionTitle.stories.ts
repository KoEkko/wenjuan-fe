import type { Meta, StoryObj } from "@storybook/react";
import QuestionTitle from "../../components/QuestionComponents/QuestionTitle/Component";

const meta = {
	title: "Question/QuestionTitle",
	component: QuestionTitle,
} satisfies Meta<typeof QuestionTitle>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {},
};

export const SetProps: Story = {
	args: {
		text: "hello",
		level: 2,
		isCenter: true,
	},
};
