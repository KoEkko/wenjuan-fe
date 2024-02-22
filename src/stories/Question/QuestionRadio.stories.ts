import type { Meta, StoryObj } from "@storybook/react";
import QuestionRadio from "../../components/QuestionComponents/QuestionRadio/Component";

const meta = {
	title: "Question/QuestionRadio",
	component: QuestionRadio,
} satisfies Meta<typeof QuestionRadio>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {},
};

const opts = [
	{ value: "v1", text: "t1" },
	{ value: "v2", text: "t2" },
	{ value: "v3", text: "t3" },
];

export const SetProps: Story = {
	args: {
		title: "hello",
		options: opts,
		value: "v1",
		isVertical: true,
	},
};
