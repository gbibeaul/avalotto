import { supabase } from "tranport/supabase";

import type { NextApiRequest, NextApiResponse } from "next";

const games = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST": {
      const { email } = await req.body;

      //check if exists
      const { count } = await supabase
        .from("email_list")
        .select("email", { count: "exact" })
        .eq("email", email);

      if (count === 0) {
        await supabase.from("email_list").insert({ email });
      }
    }

    default:
      res.status(405).end();
      return;
  }
};

export default games;
