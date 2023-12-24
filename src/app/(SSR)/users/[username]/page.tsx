import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
// import { cache } from "react";

interface PageProps {
  params: {
    username: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const clientId = process.env.UNSPLASH_ACCESS_KEY;

// in the code the fetch function used twice, but NextJS deduplicate the fetch and executes it only once it works only with fetch().
// In order to use it with axios see the commented code bellow (cache method imported from "react")
// const getUserCashed = cache(getUser);
async function getUser(username: string): Promise<UnsplashUser> {
  const url = `https://api.unsplash.com/users/${username}?client_id=${clientId}`;
  const response = await fetch(url);
  if (response.status === 404) {
    notFound();
  }
  return await response.json();
}

export async function generateMetadata({ params: { username } }: PageProps): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title:
      ([user.first_name, user.last_name].filter(Boolean).join(" ") || user.username) +
      " - NextJS Image Gallery",
  };
}

const Page = async ({ params: { username } }: PageProps) => {
  const user = await getUser(username);

  return (
    <div>
      <h1>{user.username}</h1>
      <p>First name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
      <a href={`https://unsplash.com/${user.username}`} target="_blank">
        Unsplash profile
      </a>
    </div>
  );
};

export default Page;
