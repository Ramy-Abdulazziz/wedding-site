import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
export default function Loading() {
    return (
        <div className={cn("pt-10")}>
            <Skeleton
                className={cn(
                    "mx-auto h-[35px] mt-10 mmax-w-[45%] lg:max-w-[35%] xl:max-w-[25%] 2xl:max-w-[25%] pb-[5vh] rounded-xl"
                )}
            />
            <Skeleton
                className={cn(
                    "mx-auto h-[250px] mt-5 max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] pb-[5vh] rounded-xl"
                )}
            />
            <div>
                <Skeleton
                    className={cn(
                        "mx-auto h-[35px] mt-5 max-w-[45%] lg:max-w-[35%] xl:max-w-[25%] 2xl:max-w-[25%] pb-[5vh] rounded-xl"
                    )}
                />
                <Skeleton
                    className={cn(
                        "mx-auto h-[35px] mt-5 max-w-[25%] lg:max-w-[12%] xl:max-w-[12%] 2xl:max-w-[12%] pb-[5vh] rounded-2xl"
                    )}
                />
            </div>
        </div>
    );
}
