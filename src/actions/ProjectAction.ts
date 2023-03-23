import { ProjectModel } from "~/models/ProjectModel"
import axiosClient from "."

type ProjectActionType = {
    add:(data:any) => Promise<ProjectModel>
    update:(data:any) => Promise<ProjectModel>
    delete:(id:string) => Promise<ProjectModel>
}

const ProjectAction:ProjectActionType = {
    add:async(data) => {
        const result = await axiosClient.post('/project',data);
        return result.data
    },
    update:async(data) =>{
        const result = await axiosClient.put(`/project?id=${data.id}`,{...data, id:undefined})
        return result.data
    },
    delete:async(id) => {
        const result = await axiosClient.delete(`/project?id=${id}`)
        return result.data
    }
}

export default ProjectAction