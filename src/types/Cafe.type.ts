export type FilteredCafe = {
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
  userId: string;
};

export interface CafeResponse {
  status: string;
  data: {
    cafe: FilteredCafe;
  };
}

export interface CafeLoginResponse {
  status: string;
  token: string;
}

export interface Location {
  id: string;
  location: string;
}