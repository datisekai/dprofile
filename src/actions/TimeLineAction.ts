import { TimelineModel } from "~/models/TimelineModel";
import axiosClient from ".";

type TimeLineActionType = {
  add: (data: {
    year: number;
    title: string;
    content: string;
  }) => Promise<TimelineModel>;
  update: (data: any) => Promise<TimelineModel>
  delete:(id:string) => Promise<any>
};

const TimeLineAction: TimeLineActionType = {
  add: async (data) => {
    const result = await axiosClient.post("/timeline", data);
    return result.data;
  },
  update:async(data) => {
    const result = await axiosClient.put(`/timeline?id=${data.id}`,{...data, id:undefined})
    return result.data
  },
  delete:async(id) => {
    const result = await axiosClient.delete(`/timeline?id=${id}`)
    return result.data
  },

};

export default TimeLineAction;
