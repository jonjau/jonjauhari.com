export function generateMetadata() {
  return {
    title: "About - Jonathan Jauhari",
  };
}

export default function About() {
  return (
    <article>
      <header>
        <h1 className="font-serif text-4xl/loose text-teal-600">About me</h1>
      </header>
      <p className="mb-4">
        I'm a Melbourne-based software engineer interested in financial
        applications, currently developing for a leading investment platform in
        the UK.
      </p>
      <p className="mb-4">
        Recently, I've been exploring full-stack web development, working with
        React on the front end and Spring Boot and Node.js on the server side.
        Of course, I'm looking to gain more practical experience working with
        other technology stacks, mainly so I'll have more to write here...
      </p>
    </article>
  );
}
