import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

const isLogin = (handler: any) => {
  return async (req: any, res: NextApiResponse) => {
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
        const myUser = await prisma?.user.findUnique({
          where: {
            id: decode.id,
          },
        });

        if (myUser) {
          req.userId = myUser.id;
          return handler(req, res);
        }
      }

      return res.status(401).json({ success: false, message: "No Authorized" });
    } catch (error) {
      return res.status(401).json({ success: false, message: "No Authorized" });
    }
  };
};

export default isLogin;
