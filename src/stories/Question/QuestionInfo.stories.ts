import type { Meta, StoryObj } from "@storybook/react";
import QuestionInfo from "../../components/QuestionComponents/QuestionInfo/Component";

const meta = {
	title: "Question/QuestionInfo",
	component: QuestionInfo,
} satisfies Meta<typeof QuestionInfo>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {},
};

export const SetProps: Story = {
	args: {
		title: "hello",
		desc: "world",
	},
};

export const DescBreakLine: Story = {
	args: {
		title: "desc",
		desc: "a\nb\nc",
	},
};
