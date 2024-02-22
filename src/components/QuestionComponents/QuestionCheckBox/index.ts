import QuestionCheckBox from "./Component";
import PropComponent from "./PropComponent";
import { QuestionCheckBoxDefaultProps } from "./interface";
import StatComponent from "./StatComponent";
export * from "./interface";

export default {
	title: "多选",
	type: "questionCheckBox",
	Component: QuestionCheckBox,
	PropComponent,
	defaultProps: QuestionCheckBoxDefaultProps,
	StatComponent,
};
