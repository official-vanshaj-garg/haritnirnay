export type TravelMode = 'petrol_car' | 'bus' | 'train' | 'short_flight';
export type TravelRegion = 'india' | 'global';
export type TravelPriority = 'carbon' | 'balanced' | 'time_sensitive';

export interface TravelInput {
  distanceKm: number;
  passengers: number;
  selectedMode: TravelMode;
  region: TravelRegion;
  priority: TravelPriority;
}
