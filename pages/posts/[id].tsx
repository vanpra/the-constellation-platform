import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useCallback } from "react";
import { RedRoundedButton, TransparentRoundedButton } from "../../components/Buttons";
import PostCard from "../../components/Cards/PostCard";
import LoadingSpinner from "../../components/Loading";
import ErrorDataScaffold from "../../components/Scaffolds/ErrorDataScaffold";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import { usePost } from "../../utils/supabase/db";
import classNames from "classnames";
import parse from "html-react-parser";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { error, post } = usePost(id);

  const prevPostOnClick = useCallback(() => {
    router.push(`/posts/${post?.previous_salt_post_id}`);
  }, [router, post?.previous_salt_post_id]);

  const nextPostOnClick = useCallback(() => {
    router.push(`/posts/${post?.next_salt_post?.id}`);
  }, [router, post?.next_salt_post?.id]);

 const getInitials = (name: string) => name.split(" ").map(x=>x[0]).join("");

  return (
    <>
      <ErrorDataScaffold error={error} data={post}>
        <PageScaffold>
          <TransparentRoundedButton
            className="mr-6 bg-white"
            text="Translate"
            onClick={() => { console.log("translate"); }}
          />

          <div /* POST HEADER */
            className="flex flex-row"
          >
            <div className="flex items-center justify-center bg-yellow-400 mr-4 w-16 h-16 content-center rounded-full">
              <p className="font-bold text-white text-lg">{getInitials(post?.author?.full_name || "" )}</p>
            </div>
            <div
              className="flex flex-col"
            >
              <p className="text-4xl font-medium">{post?.title}</p>
              <p className="text-ml font-normal">
                {post?.views} {((post?.views||0) == 1 ? "view" : "views") + " | "}
                Posted {post?.created_at} by {post?.author?.full_name}
              </p>
            </div>
          </div>
          
          <div /* TAGS */ 
            className="py-2 px-1 space-x-2"
          >
            <RedRoundedButton className="text-xs" text="tag"  onClick={()=>{}} />
            <RedRoundedButton className="text-xs" text="tag2" onClick={()=>{}} />
          </div>
          
          <p className="text-xl font-normal"> 
            {post?.description}
          </p>
          <div className="py-2">
            <hr className="border-gray-400 border-opacity-40 border-1"></hr>

          </div>
          
          {/* SALT LINKS */}
          {post?.salt_stage  && 
          <div
            className="w-full text-center"
          >
            {post?.prev_salt_post && <RedRoundedButton className="mr-2 float-left text-sm" onClick={prevPostOnClick} text={"<-- " + post?.prev_salt_post?.title!} />}
            {post?.salt_stage && <div className="inline-block"> Salt stage:<p className="font-bold">{post?.salt_stage}</p> </div>}
            {post?.next_salt_post && <RedRoundedButton className="mr-2 float-right text-sm" onClick={nextPostOnClick} text={post?.next_salt_post?.title! + " -->"} />}

          </div>
          }

          {parse(post?.content || "")}

          <p className="text-2xl">
            Discussion component
          </p>
        </PageScaffold>
      </ErrorDataScaffold>
    </>
  );
}
