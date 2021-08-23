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

  return (
    <>
      {avatarUrl ? (
        <ImageAvatar
          className={className}
          avatarUrl={avatarUrl}
          onClick={onClick}
        />
      ) : (
        <NameAvatar className={className} name={name} onClick={onClick} />
      )}
    </>
  );
}
