export interface FilteredStudent {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: string;
  userId: string;
}

export interface StudentResponse{
    status:string;
    data:{
        student:FilteredStudent;
    };
}

export interface StudentLoginResponse{
    status:string;
    token:string;
}
