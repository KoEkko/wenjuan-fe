import React, { FC } from "react";
import { Form, Checkbox, Input, Space, Button } from "antd";
import { OptionType, QuestionCheckBoxPropsType } from "./interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

const PropComponent: FC<QuestionCheckBoxPropsType> = (props: QuestionCheckBoxPropsType) => {
	const { title, isVertical, list = [], disabled, onChange } = props;
	const [form] = Form.useForm();
	function handleValuesChange() {
		if (onChange) {
			const newValues = form.getFieldsValue() as QuestionCheckBoxPropsType;
			if (newValues.list) {
				newValues.list = newValues.list.filter((l) => !(l.text === null));
			}
			const { list = [] } = newValues;
			list.forEach((l) => {
				if (l.value) return;
				l.value = nanoid(5);
			});
			onChange(newValues);
		}
	}
	return (
		<Form
			layout="vertical"
			initialValues={{ title, isVertical, list }}
			disabled={disabled}
			form={form}
			onValuesChange={handleValuesChange}
		>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
				<Input />
			</Form.Item>
			<Form.Item label="选项">
				<Form.List name="list">
					{(fields, { add, remove }) => {
						return (
							<>
								{fields.map(({ key, name }, index) => {
									return (
										<Space key={key} align="baseline">
											<Form.Item name={[name, "checked"]} valuePropName="checked">
												<Checkbox />
											</Form.Item>
											<Form.Item
												name={[name, "text"]}
												rules={[
													{ required: true, message: "请输入选项文字" },
													{
														validator: (_, text) => {
															const { list = [] } = form.getFieldsValue();
															let num = 0;
															list.forEach((opt: OptionType) => {
																if (opt.text === text) num++;
															});
															if (num === 1) return Promise.resolve();
															return Promise.reject(new Error("和其他选项重复了"));
														},
													},
												]}
											>
												<Input placeholder="请输入选项文字...." />
											</Form.Item>
											{index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
										</Space>
									);
								})}
								<Form.Item>
									<Button type="link" icon={<PlusOutlined />} onClick={() => add({ text: "", value: "" })} block>
										添加选项
									</Button>
								</Form.Item>
							</>
						);
					}}
				</Form.List>
			</Form.Item>
			<Form.Item name="isVertical" valuePropName="checked">
				<Checkbox>竖向排列</Checkbox>
			</Form.Item>
		</Form>
	);
};
export default PropComponent;
