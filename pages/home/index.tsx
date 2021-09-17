import React from "react";
import FeaturedPosts from "../../components/Post/FeaturedPosts";
import PageScaffold from "../../components/Scaffolds/PageScaffold";
import WorldMap from "../../components/WorldMap";

export default function HomePage() {
  return (
    <PageScaffold>
      <div>
        <div className="flex items-center flex-col">
          <h1 className="text-black text-5xl font-normal">
            Welcome to The Constellation Platform!
          </h1>
          <p className="text-black text-2xl font-normal mt-4">
            Connecting local responses around the world
          </p>
          <WorldMap className="mt-4" />

          <p className="text-black text-xl font-normal mt-6">
            Find out more about{" "}
            <a
              className="underline text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
              href="https://the-constellation.org/our-mission/"
            >
              The Constellation Organisation
            </a>
          </p>
        </div>

        <FeaturedPosts className="mt-6" />
      </div>
    </PageScaffold>
  );
}
