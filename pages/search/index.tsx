import classNames from "classnames";
import React, { useState } from "react";
import { RedRoundedButton } from "../../components/Buttons";
import PostCard from "../../components/Cards/PostCard";
import TextArea from "../../components/Inputs/TextArea";
import TextInput from "../../components/Inputs/TextInput";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import LinkedPost from "../../models/LinkedPost";
import { getSearchResults } from "../../utils/supabase/db";

export default function SearchPage() {
  const [moreOptions, setMoreOptions] = useState(false);
  const [searchData, setSearchData] = useState<SearchData>({});
  const [searchResults, setSearchResults] = useState<LinkedPost[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <PageScaffold title="Search for posts">
      <TextArea
        inputClassName="rounded-lg shadow-lg h-20 text-2xl rounded-xl shadow-sm"
        value={searchData.text ?? ""}
        setValue={(text: string) => setSearchData({ text })}
        placeholder="Search..."
      />
      <p
        className="mt-2 ml-2 text-primary hover:cursor-pointer"
        onClick={() => {
          setMoreOptions(!moreOptions);
        }}
      >
        {moreOptions ? "- Less Options" : "+ More Options"}
      </p>
      {moreOptions && <MoreOptionsSelection className="mt-4" />}
      <RedRoundedButton
        className="mt-4 mb-6"
        text="Search"
        onClick={async () => {
          const { data, error } = await getSearchResults(searchData);
          if (error) {
            setError(error.message);
          }
          if (data) {
            setSearchResults(data);
          }
        }}
      />

      {searchResults.length > 0 ? (
        <div className="flex flex-col space-y-6">
          {searchResults.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-3xl">{error ?? "No Results Found"}</p>
      )}
    </PageScaffold>
  );
}

export interface SearchData {
  text?: string;
  dateFrom?: Date;
  dateTo?: Date;
  tags?: string[];
  topic?: string;
  country?: string;
  saltStage?: string;
}

interface MoreOptionsSelectionProps {
  className?: string;
}

const MoreOptionsSelection = (props: MoreOptionsSelectionProps) => {
  const { className } = props;
  const [from, setFrom] = useState<string>(new Date().toISOString());
  const [to, setTo] = useState<string>(new Date().toISOString());

  return (
    <div className={className}>
      <MoreOptionsDateRange
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
      ></MoreOptionsDateRange>
    </div>
  );
};

interface MoreOptionsDateRangeProps {
  className?: string;
  from: string;
  to: string;
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
}

const MoreOptionsDateRange = (props: MoreOptionsDateRangeProps) => {
  const { className, from, to, setFrom, setTo } = props;
  return (
    <div className={classNames("flex flex-row items-center", className)}>
      <p className="ml-4 mr-3 text-xl">Published between</p>
      <TextInput
        value={from}
        setValue={setFrom}
        type="date"
        inputClassName="rounded-xl text-md"
      />
      <p className="ml-3 text-xl mr-3">and</p>
      <TextInput
        value={to}
        setValue={setTo}
        type="date"
        inputClassName="rounded-xl text-md"
      />
    </div>
  );
};
