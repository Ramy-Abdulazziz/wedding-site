import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AdminChart from "./AdminChart";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
const AdminGraphView = ({ rsvpData, loading }) => {
    return (
        <Card
            className={cn(
                "flex flex-shrink max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] mx-auto mt-20 md:mt-15 lg:mt-15 xl:mt-15 2xl:mt-50 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
            )}
        >
            <CardHeader>
                <CardTitle> RSVP Stats</CardTitle>
                <CardDescription> RSVP stats at a glance</CardDescription>
            </CardHeader>
            <CardContent className={cn("flex flex-row justify-start gap-4")}>
                <div
                    className={cn(
                        "flex-1 max-w-[60%] flex items-center justify-center"
                    )}
                >
                    <AdminChart rsvpData={rsvpData} className={cn("")} />
                </div>
                <div
                    className={cn("flex flex-col justify-start gap-2 w-[40%]")}
                >
                    <Button variant="outline">Send Reminder</Button>
                    <Button variant="outline">Send Message</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AdminGraphView;
