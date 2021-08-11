import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center self-center mt-8 max-w-5xl">
      <h1 className="text-black text-5xl font-normal">
        Welcocme to The Constellation Platform!
      </h1>
      <p className="text-black text-2xl font-normal mt-4">
        Connecting local responses around the world
      </p>
    </div>
  );
}
