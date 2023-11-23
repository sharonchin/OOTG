export type Product = {
  id: string;
  createdAt: string;
  name: string;
  img: string;
  productCategory: string;
  desc: string;
  price: number;
  availability: boolean;
};

export interface ProductResponse{
  status:string;
  data:{
      product:Product;
  };
}
