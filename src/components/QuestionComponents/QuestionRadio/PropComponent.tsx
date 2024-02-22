import React, { FC, useEffect } from "react";
import { Form, Checkbox, Select, Input, Space, Button } from "antd";
import { OptionType, QuestionRadioPropsType } from "./interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
	const { title, options = [], value, isVertical, onChange, disabled } = props;
	const [form] = Form.useForm();
	useEffect(() => {
		form.setFieldsValue({ title, options, value, isVertical });
	}, [title, options, value, isVertical]);
	function handleValuesChange() {
		if (onChange) {
			const newValue = form.getFieldsValue() as QuestionRadioPropsType;
			if (newValue.options) {
				newValue.options = newValue.options.filter((opt) => !(opt.text === null));
			}
			const { options = [] } = newValue;
			options.forEach((opt) => {
				if (opt.value) return;
				else opt.value = nanoid(5); // 补齐 opt value
			});
			onChange(newValue);
		}
	}
	return (
		<Form
			layout="vertical"
			initialValues={{ title, isVertical, value, options }}
			disabled={disabled}
			form={form}
			onValuesChange={handleValuesChange}
		>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题" }]}>
				<Input />
			</Form.Item>
			<Form.Item label="选项">
				<Form.List name="options">
					{(fields, { add, remove }) => (
						<>
							{/* 遍历所有的选项*/}
							{fields.map(({ key, name }, index) => {
								return (
									<Space key={key} align="baseline">
										{/* 当前选项输入框 */}
										<Form.Item
											name={[name, "text"]}
											rules={[
												{ required: true, message: "请输入选项文字" },
												{
													validator: (_, text) => {
														const { options = [] } = form.getFieldsValue();
														let num = 0;
														options.forEach((opt: OptionType) => {
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
										{index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
									</Space>
								);
							})}
							{/* 添加选项*/}
							<Form.Item>
								<Button type="link" icon={<PlusOutlined />} onClick={() => add({ text: "", value: "" })} block>
									添加选项
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form.Item>
			<Form.Item label="默认选中" name="value">
				<Select value={value} options={options.map(({ text, value }) => ({ value, label: text || "" }))}></Select>
			</Form.Item>
			<Form.Item name="isVertical" valuePropName="checked">
				<Checkbox>竖向排列</Checkbox>
			</Form.Item>
		</Form>
	);
};

export default PropComponent;
