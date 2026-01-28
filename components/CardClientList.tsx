"use client";
import { PostResponse } from "@/lib/types/post";
import { use } from "react";
import PostCard from "./PostCard";
import Link from "next/link";

export default function CardClientList({
    fetchPost,
}: {
    fetchPost: Promise<PostResponse[]>;
}) {
    const posts = use(fetchPost);
    return (
        <div className="grid grid-cols-4 gap-10 p-20">
            {/* <h2>Welcome to Dashboard</h2> */}
            {/* use () after => for UI to render the mapping, if using {} after => UI wont render*/}
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-blue-700 rounded-2xl hover:bg-amber-300 p-10"
                >
                    <Link href={`dashboard/blog/${post.id}`}>
                        <PostCard
                            key={post.id}
                            userId={post.userId}
                            id={post.id}
                            title={post.title}
                            body={post.body}
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
}
