// For games/?key=KEY&page_size=40 not /games/${id}
export interface RawgResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawgGame[];
  seo_title: string,
  seo_description: string,
  seo_keywords: string,
  seo_h1: string,
  noindex: boolean,
  nofollow: boolean,
  description: string,
}

export interface Store {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
}

export interface RawgGenre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface RawgTag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface RawgPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    year_end: string | null;
    year_start: number | null;
    games_count: number;
    image_background: string;
  };
  released_at: string;
  requirements_en: {
    minimum: string;
    recommended?: string;
  } | null;
  requirements: {
    minimum: string;
    recommended?: string;
  } | null;
  requirements_ru: {
    minimum: string;
    recommended: string;
  } | null;
}

export interface RawgGame {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: {
    id: number;
    title: string;
    count: number;
    percent: number;
  }[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
  metacritic: number | null;
  playtime: number;
  suggestions_count: number;
  updated: Date | string;
  user_game: string | null;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  esrb_rating: {
    id: number;
    slug: string;
    name: string;
  } | null;
  platforms: RawgPlatform[];
  parent_platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  genres: RawgGenre[];
  clip: string | null;
  tags: RawgTag[];
  short_screenshots: {
    id: number;
    image: string;
  }[];
  stores: {
    id: number;
    store: {
      id: number;
      name: string;
      slug: string;
      domain: string;
      games_count: number;
      image_background: string;
    };
  }[];
}


export interface RawgClickGames {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  description_raw: string
  metacritic: number;
  metacritic_platforms: [
    {
      metascore: number;
      url: string;
    },
  ];
  released: Date | string;
  tba: true;
  updated: Date | string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: object;
  reactions: object;
  added: number;
  added_by_status: object;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: string;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: string;
  youtube_count: string;
  reviews_text_count: string;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string;
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  esrb_rating: {
    id: number;
    slug: number;
    name: number;
  };
  platforms: RawgPlatform[]
  genres: RawgGenre[]
  stores: Store[]

}
