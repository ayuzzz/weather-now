export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
}

export interface NearByCity {
  name: string;
  latitude: number;
  longitude: number;
}
