import PageScaffold from "../../components/Scaffolds/PageScaffold";

export default function HomePage() {
  return (
    <PageScaffold>
      <div className="flex items-center flex-col">
        <h1 className="text-black text-5xl font-normal">
          Welcome to The Constellation Platform!
        </h1>
        <p className="text-black text-2xl font-normal mt-4">
          Connecting local responses around the world
        </p>
      </div>
    </PageScaffold>
  );
}
