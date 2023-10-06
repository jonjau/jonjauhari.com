import clsx from "clsx";
import Link from "next/link";

export function generateMetadata() {
  return {
    title: "Jonathan Jauhari",
  };
}

//TODO: mobile site, factor out common components, e.g. links, licence
export default function Home() {
  return (
    <>
      <h1 className="font-serif text-7xl/normal">
        Hi, I'm <span className="text-teal-600">Jonathan</span>.
      </h1>
      <h2 className="font-serif text-6xl/normal text-amber-200">
        I build web apps.<span className="text-amber-700">*</span>
      </h2>
      <p className="mt-8 text-xl">
        <span className="text-amber-700">*</span> learning to, anyway.
      </p>
      <p className="mt-8 text-xl">
        This website is a{" "}
        <Link
          title="GitHub repository for this site"
          href="https://github.com/jonjau/jonjauhari.com"
          className={clsx([
            "text-teal-600",
            "underline",
            "underline-offset-4",
            "decoration-dotted",
            "decoration-2",
            "decoration-teal-600",
            "hover:decoration-amber-700",
            "hover:text-teal-400",
            "focus:decoration-solid",
            "focus:decoration-amber-700",
            "focus:text-teal-200",
          ])}
        >
          work in progress
        </Link>
        . Enjoy your stay!
      </p>
    </>
  );
}
