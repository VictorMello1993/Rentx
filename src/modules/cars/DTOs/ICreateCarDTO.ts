interface ICreateCarDTO {
  name: string;
  description: string;
  daily_date: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

export { ICreateCarDTO };
