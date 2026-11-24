export function formatCurrency(value: number | string): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(Number(value));
}

export function formatDateTime(value: string): string {
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

export function formatTime(value: string): string {
    return new Intl.DateTimeFormat("pt-BR", {
        timeStyle: "short",
    }).format(new Date(value));
}
