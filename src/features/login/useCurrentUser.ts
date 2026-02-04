import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiLogin";

export function useCurrentUser(){
    const {isPending , data : user } = useQuery({
        queryKey : ["currentUser"],
        queryFn : getCurrentUser
    })

    return {isPending , user , isAuthenticated : Boolean(user)};
}