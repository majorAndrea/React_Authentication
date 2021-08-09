import jwt from "jsonwebtoken";
import { getGoogleUser } from "../utils/getGoogleUser";
import { updateOrCreateUserFromOAuth } from "../utils/updateOrCreateUserFromOauth";

export const googleOauthCallbackRoute = {
  path: "/auth/google/callback",
  method: "get",
  handler: async (req, res) => {
    const { code } = req.query;
    const oAuthUserInfo = await getGoogleUser({ code });
    const updatedGoogleUser = await updateOrCreateUserFromOAuth({
      oAuthUserInfo,
    });
    const { _id: id, isVerified, email, info } = updatedGoogleUser;

    jwt.sign(
      { id, isVerified, email, info },
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) return res.sendStatus(500);

        res.redirect(`http://localhost:3000/login?token=${token}`);
      }
    );
  },
};
