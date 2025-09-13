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
import RsvpStatus from "./RsvpStatus";

const AdminRsvpCard = () => {
    return (
        <Card
            className={cn(
                "flex flex-shrink max-w-[85%] lg:max-w-[75%] xl:max-w-[50%] 2xl:max-w-[50%] mx-auto mt-20 md:mt-35 lg:mt-35 xl:mt-35 2xl:mt-50 shadow-2xl/50 inset-shadow-xs dark:inset-shadow-gray-500 dark:shadow-2xl/50 dark:shadow-white/25"
            )}
        >
            <CardHeader>
                <CardTitle> Rsvp Responses</CardTitle>
                <CardDescription>
                    {" "}
                    A summary of all guest rsvp responses
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RsvpStatus />
            </CardContent>
        </Card>
    );
};

export default AdminRsvpCard;
