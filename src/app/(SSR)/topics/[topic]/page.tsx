import { UnsplashImage } from "@/models/unshplash-image";
import { Metadata } from "next";
import Image from "next/image";

interface PageProps {
  params: {
    topic: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - NextJS Image Gallery",
  };
}

// // Denies to render the page dynamically except the params listed in generateStaticParams
// export const dynamicParams = false;

//Function that allows the app to prefetch the data
export function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

const Page = async ({ params: { topic } }: PageProps) => {
  const clientId = process.env.UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${clientId}`;
  const response = await fetch(url);
  const topics: UnsplashImage[] = await response.json();

  return (
    <div>
      <h1>{topic[0].toUpperCase() + topic.slice(1)}</h1>
      <div className="flex flex-wrap gap-3">
        {topics.map((image) => {
          return (
            <Image
              key={image.description}
              src={image.urls.raw}
              alt={image.description}
              width={250}
              height={250}
              className="rounded-md shadow-md object-cover"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
