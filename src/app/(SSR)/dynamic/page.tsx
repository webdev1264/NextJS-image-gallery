import { UnsplashImage } from "@/models/unshplash-image";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Dynamic Fetching - NextJS Image Gallery",
};

//No cache
export const revalidate = 0;

const Page = async () => {
  const clientId = process.env.UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/photos/random?client_id=${clientId}`;
  const response = await axios.get<UnsplashImage>(url);
  const image = response.data;
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  return (
    <div className="flex items-center flex-col">
      <Image
        src={image.urls.raw}
        alt={image.description}
        width={width}
        height={height}
        className="rounded-lg shadow-md max-w-full h-full"
      />
      by <Link href={`/users/${image.user.username}`}>{image.user.username}</Link>
    </div>
  );
};

export default Page;
