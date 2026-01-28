import { PostResponse } from "../types/post";

export async function fetchDetailPost(id: string) {
    const BASE_API = process.env.NEXT_PUBLIC_API_URL;
    const data = await fetch(`${BASE_API}posts/${id}`);
    const post = await data.json();
    return post;
}

export async function fetchPost() {
    const BASE_API = process.env.NEXT_PUBLIC_API_URL;
    const data = await fetch(`${BASE_API}posts`);
    const posts: PostResponse[] = await data.json();
    return posts;
}
