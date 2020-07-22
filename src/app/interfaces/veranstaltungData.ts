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
    value: string;
  };
  start_date: Date;
  end_date: Date;

  ausgebucht: boolean;
  nr_free_spaces: number;
  nr_spaces: number;

  image_urls: string[];
  header_image: string;
  
  category: number;
  matList: string;
}
