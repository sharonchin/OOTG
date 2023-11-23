import { Cafe } from "@/types/Cafe.type";
import {
  FilteredStudent,
  StudentLoginResponse,
  StudentResponse,
} from "./types";
import { Product, ProductResponse } from "@/types/Product.type";

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

export async function apiGetAllCafe(): Promise<Cafe[]> {
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


export async function apiCreateProduct(
  credentials: string
): Promise<Product> {
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