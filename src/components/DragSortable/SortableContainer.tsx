import React, { FC } from "react";
import { DndContext, useSensor, useSensors, DragEndEvent, MouseSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
type PropsType = {
	children: JSX.Element | JSX.Element[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	items: Array<{ id: string; [key: string]: any }>;
	onDragEnd: (oldIndex: number, newIndex: number) => void;
};
const SortableContainer: FC<PropsType> = (props: PropsType) => {
	const { children, items, onDragEnd } = props;
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 8, // 8px, 只有鼠标的活动范围超过了 8px 才进行拖拽
			},
		})
	);
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (over === null) return;
		if (active.id !== over.id) {
			const oldIndex = items.findIndex((c) => c.fe_id === active.id);
			const newIndex = items.findIndex((c) => c.fe_id === over.id);
			onDragEnd(oldIndex, newIndex);
		}
	}
	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{children}
			</SortableContext>
		</DndContext>
	);
};

export default SortableContainer;
