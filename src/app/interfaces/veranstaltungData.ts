export interface VeranstaltungData {
  id: number;
  title: string;
  description: string;
  long_description: string;
  tour_destinations: string;
  programm: string;
  skills: string;
  stay: string;
  specialities: string;
  service: string;
  price: {
    currency: string;
    value: number;
  };
  start_date: Date;
  end_date: Date;
}
