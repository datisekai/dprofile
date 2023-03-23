import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";
import isLogin from "~/middleware/isLogin";
import { prisma } from "~/server/db";
import { showInternal, showMissing } from "~/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const projects = await prisma.project.findMany({
        where: {
          active: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      return res.json(projects);
    } catch (error) {
      return showInternal(res);
    }
  } else if (req.method === "POST") {
    try {
      const { url, name, description, thumbnail, html, active } = req.body;
      if (!name || !description || !thumbnail || !html) {
        return showMissing(res);
      }

      const newProject = await prisma.project.create({
        data: {
          url,
          name,
          description,
          thumbnail,
          html,
          active,
          slug:slugify(name,{lower:true})
        },
      });

      if (newProject) {
        return res.json(newProject);
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

      const updateProject = await prisma.project.update({
        where: {
          id: id as string,
        },
        data,
      });

      if (updateProject) {
        return res.json(updateProject);
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

      const deleteProject = await prisma.project.update({
        where: {
          id: id as string,
        },
        data: {
          active: false,
        },
      });

      if (deleteProject) {
        return res.json(deleteProject);
      }

      return res.status(404).json({ success: false, message: "Not found" });
    } catch (error) {
      return showInternal(res);
    }
  }
};

export default isLogin(handler);
