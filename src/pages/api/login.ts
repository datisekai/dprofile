import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { showMissing } from "~/utils";

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (!username || !password) {
      return showMissing(res);
    }

    const currentUser = await prisma.user.findUnique({ where: { username } });
    if (currentUser && currentUser.password === password) {
      const token = jwt.sign(
        { id: currentUser.id, username: currentUser.username },
        env.NEXTAUTH_SECRET as string,
        { expiresIn: "24h" }
      );

      return res.json({ token });
    }

    return res
      .status(404)
      .json({ success: false, message: "Username or password incorrect" });
  }
};

export default Login;
