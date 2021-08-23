import classNames from "classnames";

interface ImageAvatarProps {
  className?: string;
  avatarUrl: string;
  onClick?: () => void;
}
export default function ImageAvatar(props: ImageAvatarProps) {
  const { className, avatarUrl, onClick } = props;

  return (
    <div className={classNames("relative")}>
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt="User Avatar"
          className={classNames(
            "flex items-center justify-center",
            "border-2 border-black rounded-full",
            "hover:cursor-pointer",
            className
          )}
          onClick={onClick}
        />
      }
    </div>
  );
}
