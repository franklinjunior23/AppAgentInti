import { AxiosRest } from "@/helpers/ApiConfig";
import { useQuery } from "react-query";

export function GetConnectedUser(device){
    return useQuery({
        queryKey: ['user', device],
        queryFn: async () => {
            const { data } = await AxiosRest.get(`/device/${device}`)
            return data
        }
    })
}