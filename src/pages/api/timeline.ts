import { NextApiRequest, NextApiResponse } from "next";
import isLogin from "~/middleware/isLogin";
import { prisma } from "~/server/db";
import { showInternal, showMissing } from "~/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const timelines = await prisma.timeLine.findMany({
        where: {
          active: true,
        },
        orderBy: {
          year: "asc",
        },
      });

      return res.json(timelines);
    } catch (error) {
      return showInternal(res);
    }
  } else if (req.method === "POST") {
    try {
      const { year, title, content } = req.body;
      if (!year || !title || !content) {
        return showMissing(res);
      }

      const newTimeline = await prisma.timeLine.create({
        data: {
          year: Number(year),
          content,
          title,
        },
      });

      if (newTimeline) {
        return res.json(newTimeline);
      }
      return res.status(404).json({ success: false, message: "Not found" });
    } catch (error) {
      return showInternal(res);
    }
  } else if (req.method === "PUT") {
    try {
      const id = req.query.id;
      const data = req.body;

      if (!id) {
        return showMissing(res);
      }

      console.log(id,data)

      const updateTimeline = await prisma.timeLine.update({
        where: {
          id: id as string,
        },
        data,
      });

      if (updateTimeline) {
        return res.json(updateTimeline);
      }

      return res.status(404).json({ success: false, message: "Not found" });
    } catch (error) {
      return showInternal(res);
    }
  } else if (req.method === "DELETE") {
    try {
      const id = req.query.id;

      if (!id) {
        return showMissing(res);
      }

      const deleteTimeline = await prisma.timeLine.update({
        where: {
          id: id as string,
        },
        data: {
          active: false,
        },
      });

      if (deleteTimeline) {
        return res.json(deleteTimeline);
      }

      return res.status(404).json({ success: false, message: "Not found" });
    } catch (error) {
      return showInternal(res);
    }
  }
};

export default isLogin(handler);
