import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
    if (isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (Array.isArray(message)) {
            return message.join(", ");
        }

        if (typeof message === "string") {
            return message;
        }

        return "Não foi possível conectar à API.";
    }

    return "Erro inesperado.";
}
