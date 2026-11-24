import { Utensils } from "lucide-react";
import { CATEGORY_ICONS } from "./category-icons";

interface CategoryIconProps {
    name: string | null;
    className?: string;
}

export function CategoryIcon({ name, className }: CategoryIconProps) {
    const Icon = CATEGORY_ICONS.find((item) => item.value === name)?.icon ?? Utensils;
    return <Icon className={className} />;
}
