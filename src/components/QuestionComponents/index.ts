import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConf, { QuestionParagraphPropsType } from "./QuestionParagraph";
import QuestionInfoConf, { QuestionInfoPropsType } from "./QuestionInfo";
import QuestionTextAreaConf, { QuestionTextareaPropsType } from "./QuestionTextArea";
import QuestionRadioConf, { QuestionRadioPropsType, QuestionRadioStatPropsType } from "./QuestionRadio";
import QuestionCheckBoxConf, { QuestionCheckBoxPropsType, QuestionCheckBoxStatPropsType } from "./QuestionCheckBox";
// 各个组件的 prop type，统一起来
export type ComponentPropsType = QuestionInputPropsType &
	QuestionTitlePropsType &
	QuestionParagraphPropsType &
	QuestionInfoPropsType &
	QuestionTextareaPropsType &
	QuestionRadioPropsType &
	QuestionCheckBoxPropsType;
type StatComponentPropsType = QuestionRadioStatPropsType & QuestionCheckBoxStatPropsType;
// 各个组件的配置, 统一起来
export type ComponentConfType = {
	title: string;
	type: string;
	Component: FC<ComponentPropsType>;
	PropComponent: FC<ComponentPropsType>;
	defaultProps: ComponentPropsType;
	StatComponent?: FC<StatComponentPropsType>;
};

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [
	QuestionInputConf,
	QuestionTitleConf,
	QuestionParagraphConf,
	QuestionInfoConf,
	QuestionTextAreaConf,
	QuestionRadioConf,
	QuestionCheckBoxConf,
];

// 组件配置分组
export const componentConfGroup = [
	{
		groupId: "textGroup",
		groupName: "文本显示",
		components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
	},
	{
		groupId: "inputGropu",
		groupName: "用户输入",
		components: [QuestionInputConf, QuestionTextAreaConf],
	},
	{
		groupId: "chooseGroup",
		groupName: "用户选择",
		components: [QuestionRadioConf, QuestionCheckBoxConf],
	},
];

export function getComponentConfByType(type: string) {
	return componentConfList.find((c) => c.type === type) || null;
}
