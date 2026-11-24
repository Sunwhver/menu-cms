import { useQuery } from "@tanstack/react-query";
import { GuestCheckService } from "../services/guest-check.service";

const REFRESH_MS = 15_000;

export function useOpenGuestChecks() {
    return useQuery({
        queryKey: ["guest-checks", "opened"],
        queryFn: GuestCheckService.listOpened,
        refetchInterval: REFRESH_MS,
    });
}

export function useGuestCheck(id: string) {
    return useQuery({
        queryKey: ["guest-checks", id],
        queryFn: () => GuestCheckService.findOne(id),
        refetchInterval: REFRESH_MS,
    });
}
