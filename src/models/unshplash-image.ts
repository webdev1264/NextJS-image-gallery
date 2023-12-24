export interface UnsplashImage {
  id: string;
  description: string;
  user: {
    username: string;
  };
  urls: {
    raw: string;
  };
  height: number;
  width: number;
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}
