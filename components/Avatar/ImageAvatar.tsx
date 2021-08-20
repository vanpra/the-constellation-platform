import classNames from "classnames";
import Image from "next/image";

interface ImageAvatarProps {
  className?: string;
  avatarUrl: string;
  onClick?: () => void;
}
export default function ImageAvatar(props: ImageAvatarProps) {
  const { className, avatarUrl, onClick } = props;

  return (
    <div className={classNames("relative", className)}>
      <Image
        src={avatarUrl}
        alt="User Avatar"
        layout="fill"
        className={classNames(
          "flex items-center justify-center",
          "border-2 border-black rounded-full",
          "hover:cursor-pointer"
        )}
        onClick={onClick}
      />
    </div>
  );
}
