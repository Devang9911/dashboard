import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../../services/apiCabins";
import type { Cabin } from "../CabinTypes";

export function useCabins(){
    return useQuery<Cabin[]>({
        queryKey : ["cabins"],
        queryFn : getCabins
    })
}