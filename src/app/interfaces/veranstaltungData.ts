export interface VeranstaltungData {
  id: number;
  title: string;
  description: string;
  price: {
    currency: string;
    value: number;
  };
  start_date: Date;
  end_date: Date;
}
