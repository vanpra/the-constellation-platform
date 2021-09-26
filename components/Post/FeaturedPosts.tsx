import React from "react";
import { useFeaturedPosts } from "../../utils/supabase/db";
import PostCard from "../Cards/PostCard";
import ErrorDataLayout from "../Scaffolds/ErrorDataScaffold";

interface FeaturedPostsProps {
  className?: string;
}

export default function FeaturedPosts(props: FeaturedPostsProps) {
  const { className } = props;
  const { error, featuredPosts } = useFeaturedPosts(10);

  return (
    <div className={className}>
      <h2 className="text-black text-4xl font-bold mb-4">Featured Posts</h2>
      <ErrorDataLayout error={error} data={featuredPosts}>
        {(featuredPosts?.length ?? 0) > 0 ? (
          <div className="flex flex-col space-y-6">
            {featuredPosts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-xl">There are currently no posts.</p>
        )}
      </ErrorDataLayout>
    </div>
  );
}
