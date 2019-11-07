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
  ausgebucht: boolean;
  image_urls: string[];
  header_image: string;
  show: boolean;
}

export interface SortedProgram {
  year: [
    {
      year_name: string;
      month: {
        name: string;
        veranstaltungen: VeranstaltungData[];
      };
    }
  ];
}
