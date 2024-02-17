import { FilteredCafe } from "./Cafe.type";
import { Order } from "./Order.type";
import { FilteredStudent } from "./Student.type";


export interface Rating {
    id: string;
    createdAt: string;
    rating: number;
    review: string
    cafe: FilteredCafe
    cafeId: string;
    order: Order
    orderId: string;
    student: FilteredStudent
    studentId: string
}