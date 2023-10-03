import Link from "next/link";

//TODO: mobile site, factor out common components, e.g. links
export default function Home() {
  return (
    <>
      <h1 className="font-serif text-7xl/normal">
        Hi, I'm <span className="text-teal-600">Jonathan</span>.
      </h1>
      <h2 className="font-serif text-6xl/normal text-amber-200">
        I build web applications.<span className="text-amber-700">*</span>
      </h2>
      <p className="mt-8 text-xl">
        <span className="text-amber-700">*</span> learning to, anyway.
      </p>
      <p className="mt-8 text-xl">
        This website is a{" "}
        <Link
          title="GitHub repository for this site"
          href="https://github.com/jonjau/jonjauhari.com"
          className="border-b-2 border-dotted border-b-teal-600 text-teal-600 hover:border-b-amber-700 hover:text-teal-400 focus:border-solid focus:border-b-amber-700 focus:text-teal-200"
        >
          work in progress
        </Link>
        . Enjoy your stay!
      </p>
    </>
  );
}
