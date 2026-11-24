import { useState } from "react";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { ListState } from "@/components/list-state";
import { KanbanCard } from "@/cases/orders/components/kanban-card";
import { KanbanColumn } from "@/cases/orders/components/kanban-column";
import { useOrders, useUpdateOrderStatus } from "@/cases/orders/hooks/use-orders";
import { ORDER_STATUSES } from "@/cases/orders/order-status";
import type { OrderStatus } from "@/cases/orders/dtos/order.dto";

export function OrdersKanbanPage() {
    const { data = [], isLoading, isError } = useOrders();
    const updateStatus = useUpdateOrderStatus();

    const orders = data.filter((order) => order.guestCheck.status === "OPENED");

    const [activeId, setActiveId] = useState<string | null>(null);
    const activeOrder = orders.find((order) => order.id === activeId);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    function handleDragStart(event: DragStartEvent) {
        setActiveId(String(event.active.id));
    }

    function handleDragEnd(event: DragEndEvent) {
        setActiveId(null);

        const { active, over } = event;
        if (!over) return;

        const order = orders.find((item) => item.id === active.id);
        const newStatus = over.id as OrderStatus;

        if (order && order.status !== newStatus) {
            updateStatus.mutate({ id: order.id, status: newStatus });
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Pedidos</h1>
                <p className="text-sm text-muted-foreground">
                    Arraste os cartões entre as colunas para alterar o status do pedido.
                </p>
            </div>

            <ListState
                isLoading={isLoading}
                isError={isError}
                isEmpty={false}
                emptyMessage=""
            />

            {!isLoading && !isError && (
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={() => setActiveId(null)}
                >
                    <div className="grid grid-cols-4 gap-4">
                        {ORDER_STATUSES.map(({ value }) => (
                            <KanbanColumn
                                key={value}
                                status={value}
                                orders={orders.filter((order) => order.status === value)}
                            />
                        ))}
                    </div>

                    <DragOverlay>
                        {activeOrder && <KanbanCard order={activeOrder} isOverlay />}
                    </DragOverlay>
                </DndContext>
            )}
        </div>
    );
}
