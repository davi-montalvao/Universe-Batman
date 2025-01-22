import Cors from 'cors'

export interface Character {
  id: number;
  attributes: {
    name: string;
    alias: string;
    alive: boolean;
    role: string;
    description: string;
    creator: string;
    first_appearance: string;
    gender: string;
    abilities: string[];
    image_url: string;
  };
}

interface Location {
  id: number;
  attributes: {
    name: string;
    description: string;
    image_url?: string; 
    coordinates: {
      latitude: number;
      longitude: number;
    };
    creator: string;
    first_appearance: string;
    notable_events: string[]; 
    related_characters: string[]; 
    type: string; 
  };
}

interface Concept {
  id: number;
  attributes: {
    name: string;
    description: string;
    first_appearance?: string; 
    creator: string;
    related_characters: string[]; 
    related_locations: string[]; 
  }
}

interface Storyline {
  id: number;
  attributes: {
    name: string;
    description: string;
    issues: string[];
    publication_date: string;
    writer: string;
    artist: string;
    characters: string[];
    locations: string[];
    image_url: string;
  };
}

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
}

interface FallbackData<T> {
  map(arg0: (storyline: any) => any): import("../types/api").Storyline[];
  data: T[];
  total: number;
  page: number;
  per_page: number;
  pageSize: number;
  pagination: Pagination;
  meta: { pagination: Pagination };
}


const cors = Cors({
  methods: ['GET', 'POST'], 
  origin: '*', 
});

function runMiddleware(
  req: any,
  res: any,
  fn: (req: Cors.CorsRequest, res: any, next: (err?: any) => void) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const API_BASE_URL = "https://api.batmanapi.com/v1";


const FALLBACK_CHARACTERS: FallbackData<Character> = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Batman",
        alias: "Bruce Wayne",
        alive: true,
        role: "Hero",
        description: "The Dark Knight of Gotham City",
        creator: "Bob Kane, Bill Finger",
        first_appearance: "Detective Comics #27",
        gender: "Male",
        abilities: ["Martial Arts", "Detective Skills", "Gadgets"],
        image_url: "/placeholder.svg",
      }
    }
  ],
  total: 3,
  page: 1,
  per_page: 10,
  pagination: {
    total: 3,
    page: 1,
    pageSize: 10, 
  },
  meta: {
    pagination: {
      total: 3,
      page: 1,
      pageSize: 10, 
    },
  },
  map: function (callback: (character: Character) => any): any[] {
    return this.data.map(callback);
  },
  pageSize: 0
};

const FALLBACK_LOCATIONS: FallbackData<Location> = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Batcave",
        description: "Batman's secret headquarters beneath Wayne Manor",
        image_url: "/placeholder.svg", 
        coordinates: {
          latitude: 40.7128, 
          longitude: -74.0060, 
        },
        creator: "Bob Kane, Bill Finger",
        first_appearance: "Detective Comics #27",
        notable_events: ["First appearance of Batman", "Battle with the Joker", "The first Batmobile arrival"],
        related_characters: ["Batman", "Robin", "Alfred Pennyworth"],
        type: "Secret Headquarters", 
      }
    }
  ],
  total: 3,
  page: 1,
  per_page: 10,
  pageSize: 10,
  pagination: {
    total: 3,
    page: 1,
    pageSize: 10,
  },
  meta: {
    pagination: {
      total: 3,
      page: 1,
      pageSize: 10,
    },
  },
  map: function (callback: (location: Location) => any): any[] {
    return this.data.map(callback); 
  }
};


const FALLBACK_CONCEPTS: FallbackData<Concept> = {
  data: [
    {
      id: 1,
      attributes: {
        name: "The Batcave",
        description: "The Batcave is Batman's secret hideout, located beneath Wayne Manor.",
        first_appearance: "Detective Comics #27", 
        creator: "Bob Kane",  
        related_characters: ["Batman", "Robin"],
        related_locations: ["Gotham City"]  
      }
    }
  ],
  total: 3,
  page: 1,
  per_page: 10,
  pageSize: 10,
  pagination: {
    total: 3,
    page: 1,
    pageSize: 10
  },
  meta: {
    pagination: {
      total: 3,
      page: 1,
      pageSize: 10
    }
  },
  map: function (arg0: (storyline: any) => any): import('../types/api').Storyline[] {
    throw new Error('Function not implemented.');
  }
};

const FALLBACK_STORYLINES: FallbackData<Storyline> = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Hush",
        description: "A mysterious figure known as Hush manipulates Batman's foes.",
        issues: ["Batman #608–619"],
        publication_date: "2002-10-01",
        writer: "Jeph Loeb",
        artist: "Jim Lee",
        characters: ["Batman", "Catwoman", "Hush"],
        locations: ["Gotham City", "Batcave"],
        image_url: "/placeholder.svg",
      },
    },
  ],
  total: 1,
  page: 1,
  per_page: 10,
  pageSize: 10,
  pagination: {
    total: 1,
    page: 1,
    pageSize: 10,
  },
  meta: {
    pagination: {
      total: 1,
      page: 1,
      pageSize: 10,
    },
  },
  map: function (arg0: (storyline: any) => any): Storyline[] {
    return this.data.map(arg0);
  },
}

export async function fetchCharacters(page: number = 1): Promise<FallbackData<Character>> {
  try {
    const res = await fetch(`${API_BASE_URL}/characters?pagination[page]=${page}`);
    if (!res.ok) throw new Error("Failed to fetch characters");

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Unexpected response format:", text);
      throw new Error("Expected JSON, but got something else");
    }

    return await res.json();
  } catch (error) {
    console.warn("Using fallback character data:", error);
    return FALLBACK_CHARACTERS;
  }
}

export async function fetchLocations(page: number = 1): Promise<FallbackData<Location>> {
  try {
    const res = await fetch(`${API_BASE_URL}/locations?pagination[page]=${page}`);
    if (!res.ok) throw new Error("Failed to fetch locations");

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Unexpected response format:", text);
      throw new Error("Expected JSON, but got something else");
    }

    return await res.json();
  } catch (error) {
    console.warn("Using fallback location data:", error);
    return FALLBACK_LOCATIONS;
  }
}

export async function fetchConcepts(page: number = 1): Promise<FallbackData<Concept>> {
  try {
    const res = await fetch(`${API_BASE_URL}/concepts?pagination[page]=${page}`);
    if (!res.ok) throw new Error("Failed to fetch concepts");

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Unexpected response format:", text);
      throw new Error("Expected JSON, but got something else");
    }

    return await res.json();
  } catch (error) {
    console.warn("Using fallback concept data:", error);
    return FALLBACK_CONCEPTS;
  }
}

export async function fetchStorylines(page: number = 1): Promise<FallbackData<Storyline>> {
  try {
    const res = await fetch(`${API_BASE_URL}/storylines?pagination[page]=${page}`);
    if (!res.ok) throw new Error("Failed to fetch storylines");

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Unexpected response format:", text);
      throw new Error("Expected JSON, but got something else");
    }

    return await res.json();
  } catch (error) {
    console.warn("Using fallback storyline data:", error);
    return FALLBACK_STORYLINES;
  }
}

export default async function handler(
  req: { query: { type: string; page?: string } },
  res: {
    status: (code: number) => {
      json: (body: any) => void;
    };
  }
): Promise<void> {

  await runMiddleware(req, res, cors);

  const { type, page = "1" } = req.query;

  try {
    if (type === 'characters') {
      const characters = await fetchCharacters(Number(page));
      return res.status(200).json(characters);
    } else if (type === 'locations') {
      const locations = await fetchLocations(Number(page));
      return res.status(200).json(locations);
    } else if (type === 'concepts') {
      const concepts = await fetchConcepts(Number(page));
      return res.status(200).json(concepts);
    } else if (type === 'storylines') {
      const storylines = await fetchStorylines(Number(page));
      return res.status(200).json(storylines);
    } else {
      return res.status(400).json({ error: "Invalid type parameter" });
    }
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
