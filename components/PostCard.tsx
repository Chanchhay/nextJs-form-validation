import { PostResponse } from "../lib/types/post";
import { Button } from "./ui/button";

export default function PostCard({
    title = "default title",
    body = "default decs",
    userId = 0,
    id = 0,
}: PostResponse) {
    return (
        <div>
            <h2 className="line-clamp-1 font-bold">Title: {title}</h2>
            <p className="line-clamp-2">Description: {body}</p>
            <p>UserId: {userId}</p>
            <p>Id: {id}</p>
            <Button>Joch o moa</Button>
        </div>
    );
}
