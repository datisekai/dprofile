import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";

const InfoToken = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Missing token" });
    }

    try {
      const decode: any = jwt.verify(
        token as string,
        env.NEXTAUTH_SECRET as string
      );


      if (decode) {
        const currentUser: any = await prisma?.user.findFirst({
          where: {
            username: decode.username,
          },
          select: {
            id:true,
            active:true,
            username:true,
            createdAt:true,
            updatedAt:true
          },
        });

        if (currentUser) {
          return res.status(200).json(currentUser);
        }
      }
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
  }
};

export default InfoToken;
