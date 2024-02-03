import { FreshContext } from "$fresh/server.ts";
import { getNewsMap } from "../../utils/newsProviders.ts";

export const handler = async (req: Request, _ctx: FreshContext): Response => {
  try {
    const searchParams = new URL(req.url).searchParams;
    const provider = searchParams.get("provider");
    const page = (searchParams.get("page") as any || 1) * 1 || 1;

    if (!provider) {
      return Response.json(
        { message: "Please select a provider" },
        {
          status: 400,
        },
      );
    }

    const getNews = getNewsMap[provider];

    if (!getNews) {
      return Response.json(
        { message: "Invalid provider" },
        {
          status: 400,
        },
      );
    }

    const news = await getNews(page);

    return Response.json(news);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
};
