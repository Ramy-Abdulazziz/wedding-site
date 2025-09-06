import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
export default function Loading() {
    return (
        <Skeleton
            className={cn(
                "bg-gray-400/35 dark:bg-muted mx-auto h-[500px] mt-35 max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] pb-[5vh] rounded-xl"
            )}
        />
    );
}
