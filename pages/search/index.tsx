import React, { useState } from "react";
import { RedRoundedButton } from "../../components/Buttons";
import PostCard from "../../components/Cards/PostCard";
import TextArea from "../../components/Inputs/TextArea";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import MoreOptions from "../../components/Search/MoreOptions";
import LinkedPost from "../../models/LinkedPost";
import Topic, { anyTopic } from "../../models/Topic";
import { anyCountry, Country } from "../../utils/countries";
import { anySaltStage, SaltStage } from "../../utils/salt";
import { getSearchResults } from "../../utils/supabase/db";
import { supabase } from "../../utils/supabase/supabaseClient";

export interface SearchData {
  text?: string;
  dateFrom?: string;
  dateTo?: string;
  tags: string[];
  topic: Topic;
  country: Country;
  saltStage: SaltStage;
}

const defaultSearchData: SearchData = {
  tags: [],
  topic: anyTopic,
  country: anyCountry,
  saltStage: anySaltStage,
};

interface SearchPageProps {
  topics: Topic[];
}

export async function getStaticProps() {
  const { error, data } = await supabase.from("topics").select();

  if (error) {
    return {
      notFound: true,
      revalidate: 86400,
    };
  }

  return {
    props: {
      topics: data,
      revalidate: 86400,
    },
  };
}

export default function SearchPage(props: SearchPageProps) {
  const { topics } = props;

  const [moreOptions, setMoreOptions] = useState(false);
  const [searchData, setSearchData] = useState<SearchData>(defaultSearchData);
  const [searchResults, setSearchResults] = useState<LinkedPost[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <PageScaffold title="Search for posts">
      <TextArea
        inputClassName="rounded-lg shadow-lg h-20 text-2xl rounded-xl shadow-sm"
        value={searchData.text ?? ""}
        setValue={(text: string) => setSearchData({ ...searchData, text })}
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
      {moreOptions && (
        <MoreOptions
          className="mt-2"
          topics={topics}
          searchData={searchData}
          setSearchData={setSearchData}
        />
      )}
      <RedRoundedButton
        className="mt-4 mb-6 ml-4 mr-4"
        text="Search"
        onClick={async () => {
          const { data, error } = await getSearchResults(searchData);
          if (error) {
            setSearchResults([]);
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
