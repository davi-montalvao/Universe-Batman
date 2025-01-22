export interface Character {
  id: number;
  attributes: {
    name: string;
    alias: string;
    description: string;
    first_appearance: string;
    image_url: string;
    alive: boolean;
    role: string;
    creator: string;
    gender: string;
    abilities: string[];
  };
}

export interface Location {
  id: number
  attributes: {
    name: string
    description: string
    image_url?: string 
    coordinates: {
      latitude: number
      longitude: number
    }
    creator: string
    first_appearance: string
    notable_events: string[] 
    related_characters: string[] 
    type: string 
  }
}

export interface Concept {
  id: number;
  attributes: {
    name: string;
    description: string;
    first_appearance?: string; 
    creator: string;
    related_characters: string[]; 
    related_locations: string[];  
  };
}

export interface Storyline {
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
export interface ApiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      total: number
      page: number
      pageSize: number
    }
  }
}
