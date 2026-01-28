import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { PostResponse } from "@/lib/types/post";

export default function Cards({ userId, id, title, body }: PostResponse) {
    return (
        <Card className="w-full max-w-3xl mx-auto mt-90 gap-10">
            <CardHeader className="p-10">
                <CardTitle className="text-5xl">{title}</CardTitle>
                <CardDescription className="text-2xl mt-10">
                    {body}
                </CardDescription>
                <CardAction>
                    <Button variant="link">Sign Up</Button>
                </CardAction>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </CardFooter>
        </Card>
    );
}
