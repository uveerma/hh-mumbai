import { NextApiRequest, NextApiResponse } from "next";
import { candypay } from "../../helpers";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { items } = req.body;

    try {
      const response = await candypay.session.create({
        success_url: "https://hh-mumbai.vercel.app/items/1",
        cancel_url: "https://hh-mumbai.vercel.app/items/1",
        tokens: ["samo", "bonk", "isc"],
        items: items,
        discounts: {
          collection_id: "J3CQs9xfn5YAPU1pP3YhdMLQcJuRtuFZBfDJSxxuwxof",
          discount: 0.95,
          name: "Coupon NFT",
          image:
            "https://merch.superteam.fun/wp-content/uploads/2021/04/Clubhouse-Back.png",
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: "Internal server error, Error creating session",
      });
    }
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
};

export default handler;
