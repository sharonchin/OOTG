import USERTYPE from "@/constants/USERTYPE";
import { FilteredStudent } from "./Student.type";
import { FilteredCafe } from "./Cafe.type";
import { FilteredRider } from "./Rider.type";

export interface User {
  id: string;
  userType: USERTYPE;
  student?: FilteredStudent;
  cafe?: FilteredCafe;
  rider?: FilteredRider;
}

export interface UserResponse {
  status: string;
  data: {
    user: User;
  };
}
