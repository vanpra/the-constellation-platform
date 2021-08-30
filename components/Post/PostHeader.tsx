import { useRouter } from "next/dist/client/router";
import React from "react";
import Post from "../../models/Post";
import Avatar from "../Avatar/Avatar";

interface PostHeaderProps {
    post?: Post;
    onAvatarClick?: () => void;
    buttons?: React.ReactNode;
}

export function PostHeader(props: PostHeaderProps) {
    const { post, onAvatarClick, buttons } = props;
    const router = useRouter();

    return (
        <div
            className="flex flex-row"
        >                <Avatar
                className="w-16 h-16 mr-4"
                avatarUrl={post?.author?.avatar_url}
                name={post?.author?.full_name}
                onClick={() => router.push(`profile/${post?.author?.id}`)}
            />
            <div
                className="flex flex-col"
            >
                <p className="text-4xl font-medium">{post?.title}</p>
                <p className="text-ml font-normal">
                    {post?.views} {((post?.views || 0) == 1 ? "view" : "views") + " | "}
                    Posted {post?.created_at} by {post?.author?.full_name}
                </p>
            </div>
            <>{buttons}</>
        </div>
    );
}
