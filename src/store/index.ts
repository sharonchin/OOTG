"use client";

import { FilteredStudent } from "@/lib/types";
import {create} from "zustand";

type Store={
    authUser:FilteredStudent | null;
    requestLoading:boolean;
    setAuthUser:(student:FilteredStudent | null) => void;
    setRequestLoading: (isLoading:boolean)=>void;
    reset:()=>void;
};

const useStore = create<Store>((set)=>({
    authUser:null,
    requestLoading:false,
    setAuthUser:(student)=>set((state)=>({...state,authUser:student})),
    setRequestLoading:(isLoading)=>
        set((state)=>({...state,requestLoading:isLoading})),
    reset:()=> set({authUser:null,requestLoading:false}),
}));

export default useStore;