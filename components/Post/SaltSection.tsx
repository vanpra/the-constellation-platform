import { useRouter } from "next/dist/client/router";
import React, { useCallback } from "react";
import LinkedPost from "../../models/LinkedPost";
import { RedRoundedButton } from "../Buttons";

interface SaltSectionProps {
  post?: LinkedPost;
}

export function SaltSection(props: SaltSectionProps) {
  const { post } = props;
  const router = useRouter();

  const prevPostOnClick = useCallback(() => {
    router.push(`/posts/${post?.previous_salt_post_id}`);
  }, [router, post?.previous_salt_post_id]);

  const nextPostOnClick = useCallback(() => {
    router.push(`/posts/${post?.next_salt_post?.id}`);
  }, [router, post?.next_salt_post?.id]);

  return post?.salt_stage ? (
    <div className="grid-cols-3 grid">
      <div>
        {" "}
        {post?.prev_salt_post && (
          <RedRoundedButton
            className="text-sm"
            onClick={prevPostOnClick}
            text={"<-- " + post?.prev_salt_post?.title}
          />
        )}{" "}
      </div>
      {post?.salt_stage && (
        <div className=" text-center text-xl">
          {" "}
          Salt stage:<p className="font-bold">{post?.salt_stage}</p>{" "}
        </div>
      )}
      <div>
        {" "}
        {post?.next_salt_post && (
          <RedRoundedButton
            className="text-sm float-right "
            onClick={nextPostOnClick}
            text={post?.next_salt_post?.title + " -->"}
          />
        )}{" "}
      </div>
    </div>
  ) : (
    <></>
  );
}
