
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import { blacklistAShop, createVendorShop, getAllShopsForAdmin, getAllShopsForVendor, updateVendorShop } from "@/services/AdminServices/ManageShops";
import { getAllShops, getAllShopsProduct, getVendorShopOrderData } from "@/services/VendorShopService";





  export const useGetAllShops = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['shops', query], // Include query parameters in the key
      queryFn: () => getAllShopsForAdmin(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };

  export const useGetAllShopsForPublic = () => {
    return useQuery({
      queryKey: ['shops'], // Include query parameters in the key
      queryFn: () => getAllShops(),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };


  export const useGetAllVendorShopsOrders = (id:string) => {
    return useQuery({
      queryKey: ['shops', id], // Include query parameters in the key
      queryFn: () => getVendorShopOrderData(id),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };
  export const useGetAllShopProduct = (id:string) => {
    return useQuery({
      queryKey: ['shops', id], // Include query parameters in the key
      queryFn: () => getAllShopsProduct(id),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };


  export const useGetAllVendorMyShops = (query: Record<string, any>) => {
    return useQuery({
      queryKey: ['shops', query], // Include query parameters in the key
      queryFn: () => getAllShopsForVendor(query),
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
  };
  


  export const useBlacklistShop = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['blacklistShop'],
      mutationFn: async (id: string) => {
        
        return await blacklistAShop(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['shops'] }); // Invalidate the 'users' cache
      },
    });
  };


  
  export const useUpdateVendorShop = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['shops'],
      mutationFn: async ({ id, formData }: { id: string; formData: FieldValues }) => {
              
        return await updateVendorShop(id, formData);
      },
      onSuccess: () => {
        toast.success('VendorShop updated successfully');
        queryClient.invalidateQueries({ queryKey: ['shops'] }); // Invalidate the cache
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to update VendorShop');
      },
    });
  }





  export const useCreateVendorShop = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ['categories'],
      mutationFn: async (data:FieldValues) => {
        return await createVendorShop(data);
      },
      onSuccess: () => {
        toast.success("VendorShop created successfully");
        queryClient.invalidateQueries({ queryKey: ['shops'] }); // Invalidate the 'categories' cache
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to created VendorShop');
      },
    });
  };

