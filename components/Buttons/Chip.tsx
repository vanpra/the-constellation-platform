import classNames from "classnames";
import { useRouter } from "next/dist/client/router";
import React from "react";
import CloseCircle from "../../assets/close_circle.svg";

interface ChipProps {
  label: string;
  button?: React.ReactNode;
  onClick?: () => void;
}

export default function Chip(props: ChipProps) {
  const { label, button, onClick } = props;

  return (
    <div
      className={classNames(
        { "pl-5 pr-3 py-1": button },
        { "px-4 py-1": !button },
        "flex flex-row items-center",
        "bg-white rounded-full shadow-sm content"
      )}
      onClick={onClick}
    >
      <p className="text-lg">{label}</p>
      {button && <div className="ml-1">{button}</div>}
    </div>
  );
}

interface ChipListProps {
  tags: string[];
  setTags?: (tags: string[]) => void;
  searchOnClick?: boolean;
}

export function ChipList(props: ChipListProps) {
  const { tags, setTags, searchOnClick } = props;
  const router = useRouter();

  if (tags.length === 0) {
    return <></>;
  }
  return (
    <div className="flex flex-wrap gap-x-2 mt-3">
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          onClick={
            searchOnClick
              ? () =>
                  router.push({
                    pathname: "/search",
                    query: { tags: tag },
                  })
              : undefined
          }
          button={
            setTags && (
              <CloseCircle
                width="24"
                height="24"
                className={classNames(
                  "fill-current text-gray-400",
                  "hover:text-gray-500 hover:cursor-pointer"
                )}
                onClick={() => {
                  setTags(tags.filter((_, i) => i != index));
                }}
              />
            )
          }
        />
      ))}
    </div>
  );
}
