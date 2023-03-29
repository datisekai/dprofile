import { NextApiRequest, NextApiResponse } from "next";
import isLogin from "~/middleware/isLogin";
import { prisma } from "~/server/db";
import { showInternal, showMissing } from "~/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const infos = await prisma.info.findMany();
    return res.json(infos);
  } else if (req.method === "POST") {
    try {
      const { code, content, title } = req.body;
      if (!code || !content || !title) {
        return showMissing(res);
      }

      const newInfo = await prisma.info.create({
        data: {
          code,
          content,
          title,
        },
      });

      if (newInfo) {
        return res.json(newInfo);
      }

      return res.status(404).json({ success: false, message: "Not found" });
    } catch (error) {
      return showInternal(res);
    }
  } else if (req.method === "PUT") {
    try {
      const id = req.query.id as string;
      if (!id) {
        return showMissing(res);
      }

      const data = req.body;
      const newInfo = await prisma.info.update({
        data: {
          ...data,
          updatedAt: Date.now(),
        },
        where: { id },
      });
      if (newInfo) {
        return res.json(newInfo);
      }

      return res.status(404).json({ success: false, message: "Not found" });
    } catch (error) {
      return showInternal(res);
    }
  } else if (req.method === "DELETE") {
    try {
      const id = req.query.id as string;
      if (!id) {
        return showMissing(res);
      }

      const deleteInfo = await prisma.info.delete({ where: { id } });

      if (deleteInfo) {
        return res.json(deleteInfo);
      }

      return res.status(404).json({ success: false, message: "Not found" });
    } catch (error) {
      return showInternal(res);
    }
  }
};

export default isLogin(handler);
