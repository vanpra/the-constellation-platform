import classNames from "classnames";
import LoadingSpinner from "../../components/Loading";
import Topic from "../../models/Topic";
import { useTopics } from "../../utils/db";

interface TopicCardProps {
  topic: Topic;
}

export default function TopcisPage() {
  const { topics, error } = useTopics();

  return (
    <div
      className={classNames(
        "flex flex-col self-center",
        "w-full max-w-5xl mt-8"
      )}
    >
      <h1 className={classNames("font-medium text-5xl")}>Topics</h1>

      <div className="mt-8">
        {error && <p>{error}</p>}
        {topics && (
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        )}

        {!topics && !error && <LoadingSpinner />}
      </div>
    </div>
  );
}

//TODO: Extract out card layout div into component
function TopicCard(props: TopicCardProps) {
  const { topic } = props;
  return (
    <div
      className={classNames(
        "flex flex-row justify-between",
        "w-full rounded-2xl ",
        "pl-8 pr-8 pt-5 pb-5",
        "bg-background-light active:bg-background-dark shadow hover:cursor-pointer "
      )}
    >
      <div className={classNames("flex flex-col justify-center")}>
        <h4 className="text-4xl">{topic.title}</h4>
        <p className="text-xl mt-2 text-gray-800">{topic.description}</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="text-4xl">3</p>
        <p className="text-xl">posts</p>
      </div>
    </div>
  );
}
