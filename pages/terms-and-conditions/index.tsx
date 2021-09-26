import PageScaffold from "../../components/Scaffolds/PageScaffold";

export default function TermsAndConditions() {
  return (
    <PageScaffold title="Terms and Conditions">
      <div className="text-xl">
        <p>
          Thank you for sharing on The Constellation Learn and Share platform.
          Your experience is valuable as we aim to build new knowledge about
          sustainable local responses to global issues.
        </p>
        <br />
        <p>
          On this platform you can share your and your communities experience in
          the form of your choice: written, oral, visual. The audio-visual
          content will be available to all members of The Constellation Learn
          and Share platform.
        </p>
        <br />
        <p>
          We expect you to get consent from individuals who feature in your
          community&apos;s experience. This means informing individuals that the
          audio-visual content from your community will be shared on a platform
          that is dedicated to global knowledge sharing. Once audio-visual
          content is uploaded we shall assume that you have already received
          consent from all individuals who appear or can be heard in the
          audio-visual content.
        </p>
        <br />

        <p>
          The Constellation nor its members and users of the platform shall
          share content from the platform for their commercial benefit. The
          Constellation Board may be interested in sharing content from The
          Constellation Learn and Share Platform beyond the platform. This may
          be through other communication channels such as the website{" "}
          <a
            className="text-blue-600"
            href="https://www.the-constellation.org"
            rel="noreferrer"
            target="_blank"
          >
            www.the-constellation.org
          </a>
          , The Constellation newsletter or annual report. The Constellation
          board shall ask for your permission to do so before this happens and
          shall reference the source.
        </p>
        <br />

        <p>
          By joining The Constellation Learn and Share platform you are held in
          agreement with these terms and conditions.
        </p>
      </div>
    </PageScaffold>
  );
}
