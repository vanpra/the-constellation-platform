import classNames from "classnames";
import React from "react";
import Topic from "../../../models/Topic";
import { SearchData } from "../../../pages/search";
import { SaltStage } from "../../../utils/salt";
import MoreOptionsDateRange from "./MoreOptionsDateRange";
import MoreOptionsSaltStage from "./MoreOptionsSALTStage";
import MoreOptionsTags from "./MoreOptionsTags";
import MoreOptionsTopic from "./MoreOptionsTopic";

interface MoreOptionsProps {
  className?: string;
  topics: Topic[];
  searchData: SearchData;
  setSearchData: (searchData: SearchData) => void;
}

export default function MoreOptions(props: MoreOptionsProps) {
  const { className, topics, searchData, setSearchData } = props;

  return (
    <div className={classNames("ml-4 mr-4", className)}>
      <MoreOptionsDateRange
        from={searchData.dateFrom}
        setFrom={(from: string) =>
          setSearchData({ ...searchData, dateFrom: from })
        }
        to={searchData.dateFrom}
        setTo={(to: string) => setSearchData({ ...searchData, dateTo: to })}
      />

      <MoreOptionsTags
        tags={searchData.tags}
        setTags={(tags: string[]) => setSearchData({ ...searchData, tags })}
      />

      <div className="flex flex-row gap-x-4">
        <MoreOptionsTopic
          className="flex-1"
          topics={topics}
          topic={searchData.topic}
          setTopic={(topic: Topic) => setSearchData({ ...searchData, topic })}
        />
        {/* <MoreOptionsCountry
          className="flex-1"
          country={searchData.country}
          setCountry={(country: Country) =>
            setSearchData({ ...searchData, country })
          }
        /> */}
        <MoreOptionsSaltStage
          className="flex-1"
          saltStage={searchData.saltStage}
          setSaltStage={(saltStage: SaltStage) =>
            setSearchData({ ...searchData, saltStage })
          }
        />
      </div>
    </div>
  );
}
