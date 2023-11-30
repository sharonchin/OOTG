import {
  CafeLoginResponse,
  CafeResponse,
  FilteredCafe,
} from "@/types/Cafe.type";
import {
  FilteredStudent,
  StudentLoginResponse,
  StudentResponse,
} from "../types/Student.type";
import { Product, ProductResponse } from "@/types/Product.type";
import { User, UserResponse } from "@/types/User.type";
import {
  FilteredRider,
  RiderResponse,
  RiderLoginResponse,
} from "@/types/Rider.type";

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson && data.errors !== null) {
      throw new Error(JSON.stringify(data.errors));
    }

    throw new Error(data.message || response.statusText);
  }

  return data as T;
}

export async function apiRegisterStudent(
  credentials: string
): Promise<FilteredStudent> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/student/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<StudentResponse>(response).then(
    (data) => data.data.student
  );
}

export async function apiLoginStudent(credentials: string): Promise<string> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/student/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<StudentLoginResponse>(response).then(
    (data) => data.token
  );
}

export async function apiLogoutStudent(): Promise<void> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/student/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<void>(response);
}

export async function apiGetAuthStudent(
  token?: string
): Promise<FilteredStudent> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${SERVER_ENDPOINT}/api/students/me`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<StudentResponse>(response).then(
    (data) => data.data.student
  );
}

export async function apiRegisterCafe(
  credentials: string
): Promise<FilteredCafe> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/cafe/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<CafeResponse>(response).then((data) => data.data.cafe);
}

export async function apiLoginCafe(credentials: string): Promise<string> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/cafe/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<CafeLoginResponse>(response).then((data) => data.token);
}

export async function apiLogoutCafe(): Promise<void> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/cafe/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<void>(response);
}

export async function apiGetAuthCafe(token?: string): Promise<FilteredCafe> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${SERVER_ENDPOINT}/api/cafes/me`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<CafeResponse>(response).then((data) => data.data.cafe);
}

export async function apiRegisterRider(
  credentials: string
): Promise<FilteredRider> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/rider/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3002",
    },
    body: credentials,
  });

  return handleResponse<RiderResponse>(response).then(
    (data) => data.data.rider
  );
}

export async function apiLoginRider(credentials: string): Promise<string> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/rider/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3002",
    },
    body: credentials,
  });

  return handleResponse<RiderLoginResponse>(response).then(
    (data) => data.token
  );
}

export async function apiLogoutRider(): Promise<void> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/rider/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3002",
    },
  });

  return handleResponse<void>(response);
}

export async function apiGetAuthUser(token?: string): Promise<User> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${SERVER_ENDPOINT}/api/user/me`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<UserResponse>(response).then((data) => data.data.user);
}

export async function apiGetAllCafe(): Promise<FilteredCafe[]> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/cafe`, {
    method: "GET",
  });

  return response.json();
}

export async function apiGetAllProduct(): Promise<Product[]> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/product`, {
    method: "GET",
  });

  return response.json();
}

export async function apiCreateProduct(credentials: string): Promise<Product> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/product`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<ProductResponse>(response).then(
    (data) => data.data.product
  );
}

export async function apiUpdateProduct(
  credentials: string,
  productId: string
): Promise<Product> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/product/${productId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  });

  return handleResponse<ProductResponse>(response).then(
    (data) => data.data.product
  );
}
