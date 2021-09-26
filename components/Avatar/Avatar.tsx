import { useCallback } from "react";
import ImageAvatar from "./ImageAvatar";
import NameAvatar from "./NameAvatar";

interface AvatarProps {
  className?: string;
  avatarUrl?: string;
  name?: string;
  onClick?: () => void;
}

export default function Avatar(props: AvatarProps) {
  const { className, avatarUrl, name, onClick } = props;

  const onClickNoPropogate = useCallback(
    (e?) => {
      if (e) {
        e.stopPropagation();
      }
      if (onClick) {
        onClick();
      }
    },
    [onClick]
  );
  return (
    <>
      {avatarUrl ? (
        <ImageAvatar
          className={className}
          avatarUrl={avatarUrl}
          onClick={onClickNoPropogate}
        />
      ) : (
        <NameAvatar
          className={className}
          name={name}
          onClick={onClickNoPropogate}
        />
      )}
    </>
  );
}
