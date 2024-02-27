import { RegisterFormData } from "./pages/Register";
import { LoginFormData } from "./pages/Login";
import { HotelType } from "../../server/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};
export const login = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};
export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
      credentials: "include",
    });

    if (!response.ok) throw new Error("Error during sign out");
  } catch (err) {
    console.log(err);
  }
};
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};
export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};
export const getMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  console.log(response);
  return response.json();
};

getMyHotels()
