export interface FilteredRider {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNo: string;
  deliveryMode: string;
  vehicleNo: string;
  userId: string;
  status: boolean;
}

export interface RiderResponse {
  status: string;
  data: {
    rider: FilteredRider;
  };
}

export interface RiderLoginResponse {
  status: string;
  token: string;
}

export interface DeliveryMode {
  id: string;
  deliveryMode: string;
}
