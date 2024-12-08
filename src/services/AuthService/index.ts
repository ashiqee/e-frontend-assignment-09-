"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

import nexiosInstance from "@/config/naxios.config";


// registration part

interface AuthResponse{
    success:boolean;
    data:{
        accessToken:string;
        refreshToken:string;
    }
}

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await nexiosInstance.post<AuthResponse>("/auth/register", userData);


    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await nexiosInstance.post<AuthResponse>("/auth/login", userData);
    console.log(data);
    

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  redirect('/login')
};

// get current user

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    console.log(decodedToken);
    

    return {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      role: decodedToken.role,
      status: decodedToken.status,
      profilePhoto: decodedToken.profilePhoto,
      isVerified: decodedToken.isVerified
    };
  }

  return decodedToken;
};

// new accessToken

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await nexiosInstance.post<any>(
      "/auth/refresh-token",
      {},
      {
        withCredentials: true,
        headers: {
          cookies: `refreshToken=${refreshToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};


export const changePassword = async(updatePassword:FieldValues)=>{

  try{
    

    
    const res = await nexiosInstance.post<any>('/auth/change-password',{
      "oldPassword":updatePassword.oldPassword,
      "newPassword":updatePassword.newPassword,
    },
    
        )


    return res.data;

  }catch(error:any){
    throw new Error(error)
  }

}