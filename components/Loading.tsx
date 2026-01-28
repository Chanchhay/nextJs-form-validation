import { Skeleton } from "./ui/skeleton";

export default function Loading() {
    return (
        <div className="grid grid-cols-4 gap-10 p-20">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="aspect-5/4 w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}
