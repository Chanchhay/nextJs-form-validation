import PostCard from "@/components/PostCard";
import { fetchDetailPost } from "@/lib/data/fetchPost";
export default async function page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const {slug} = await params
    const post = await fetchDetailPost(slug);
    return (
        <div>
            <h2>Blog page {slug}</h2>
            <PostCard key={post.id} userId={post.userId} id={post.id} title={post.title} body={post.body} />
        </div>
    );
}
