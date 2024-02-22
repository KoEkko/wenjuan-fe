import type { Meta, StoryObj } from "@storybook/react";
import QuestionTextArea from "../../components/QuestionComponents/QuestionTextArea/Component";

const meta = {
	title: "Question/QuestionTextArea",
	component: QuestionTextArea,
} satisfies Meta<typeof QuestionTextArea>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {},
};

export const SetProps: Story = {
	args: {
		title: "hello",
		placeholder: "test",
	},
};
