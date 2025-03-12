export interface Weather {
  id: number;
  name: string;
  main: {
    temp: number;
    feels_like: number; 
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}