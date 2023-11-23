export type Cafe = {
  id: string;
  createdAt: string;
  name: string;
  img: string;
  email: string;
  password: string;
  phoneNo: string;
  locId: string;
  loc: {
    location: string;
  };
  cafeCategory: string;
  operatingHour: string;
  status: string;
};
