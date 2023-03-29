import { InfoModel } from "~/models/InfoModel"
import axiosClient from "."

type InfoActionType = {
    add:(data:{content:string, title:string, code:string}) => Promise<InfoModel>
    update:(data:any) => Promise<InfoModel>
    delete:(id:string) => Promise<InfoModel>
}

const InfoAction:InfoActionType = {
    add:async(data) => {
        const result = await axiosClient.post('/info',data)
        return result.data
    },
    update:async(data) => {
        const result = await axiosClient.put(`/info?id=${data.id}`,{...data, id:undefined})
        return result.data
    },
    delete:async(id) => {
        const result = await axiosClient.delete(`/info?id=${id}`)
        return result.data
    }
}

export default InfoAction