import type { Meta, StoryObj } from "@storybook/react";
import QuestionParagraph from "../../components/QuestionComponents/QuestionParagraph/Component";

const meta = {
	title: "Question/QuestionParagraph",
	component: QuestionParagraph,
} satisfies Meta<typeof QuestionParagraph>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
	args: {},
};

export const SetProps: Story = {
	args: {
		text: "hello",
		isCenter: true,
	},
};
