import type { SpotDTO } from "@/cases/spots/dtos/spot.dto";

export type OrderStatus = "NEW" | "PREPARING" | "READY" | "DELIVERED";

export interface OrderItemDTO {
    id: string;
    quantity: number;
    price: string;
    subtotal: string;
    product: {
        id: string;
        name: string;
    };
}

export interface OrderDTO {
    id: string;
    createdAt: string;
    status: OrderStatus;
    total: string;
    items: OrderItemDTO[];
    guestCheck: {
        id: string;
        createdAt: string;
        status: "OPENED" | "CLOSED";
        spot: SpotDTO;
    };
}
