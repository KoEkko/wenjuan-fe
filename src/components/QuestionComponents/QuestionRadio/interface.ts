export type OptionType = {
	value: string;
	text: string;
};

export type QuestionRadioPropsType = {
	title?: string;
	options?: OptionType[];
	value?: string;
	isVertical?: boolean;

	onChange?: (newProps: QuestionRadioPropsType) => void;
	disabled?: boolean;
};

export type QuestionRadioStatPropsType = {
	stat: Array<{ name: string; count: number }>;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
	title: "单选标题",
	options: [
		{ value: "item1", text: "选项1" },
		{ value: "item2", text: "选项2" },
		{ value: "item3", text: "选项3" },
	],
	isVertical: false,
	value: "",
};
