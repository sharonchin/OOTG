type Cafes= {
    id: number;
    name: string;
    img?: string|undefined;
    contact: string;
    loc: string;
    openingHour:string;
    joinedDate:string;
}

type Cafe = Cafes[];

export const MainCafes: Cafe = [
    {
        id: 1,
        name: "cafe a",
        img:"/assets/cafea.png",
        contact: "0149750619",
        loc: "KKE",
        openingHour:"730am-1130am",
        joinedDate:"13/5/2023",
     
    },
    {
      id: 2,
      name: "cafe b",
      img:"/assets/cafeb.png",
      contact: "0123456789",
      loc: "KKE",
      openingHour:"730am-1130am",
      joinedDate:"13/5/2023",
   
  },
  {
    id: 3,
    name: "cafe c",
    img:"/assets/cafec.png",
    contact: "0149750615",
    loc: "KKF",
    openingHour:"730am-1130am",
    joinedDate:"13/5/2023",
 
},
]


type Product = {
    id: number;
    name: string;
    desc?: string;
    img?: string;
    price: number;
    productAvailablity: boolean;
  };
  
  type Products = Product[];

  export const Products: Products = [
    {
      id: 1,
      name: "Laksa",
      desc: "Sarawak Food",
      img: "/assets/Laksa.png",
      price: 24.9,
      productAvailablity:false,
     
    },
    {
      id: 2,
      name: "Mee Mamak",
      desc: "Spicy and delicous food",
      img: "/assets/MeeMamak.png",
      price: 24.9,
      productAvailablity:false,
     
    },
    {
      id: 3,
      name: "BeeHon",
      desc: "Supper",
      img: "/assets/BeeHon.png",
      price: 10,
      productAvailablity:false,
     
    },
]

  // {
  //   id: 2,
  //   name: "Mee Mamak",
  //   desc: "Spicy and delicous food",
  //   img: "/public/assets/img2.png",
  //   price: 24.9,
  //   productAvailablity:false,
   
  // },
  // {
  //   id: 3,
  //   name: "Mee Goreng",
  //   desc: "Supper",
  //   img: "/public/assets/img3.png",
  //   price: 10,
  //   productAvailablity:false,
   
  // },

  

type Category = {
    id: number;
    slug: string;
    title: string;
  }[];

  export const Category: Category = [
    {
      id: 1,
      slug: "western",
      title: "Western",
    },
    {
      id: 2,
      slug: "noodle",
      title: "noodle",
      
    },
    {
      id: 3,
      slug: "rice",
      title: "rice",
      
    },
  ];



  