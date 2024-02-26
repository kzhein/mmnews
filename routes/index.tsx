import { Handlers, PageProps } from "$fresh/server.ts";
import News from "../islands/News.tsx";
import {
  NewsProvider,
  newsProviders,
  NewsResult,
} from "../utils/newsProviders.ts";

export const handler: Handlers<
  ({ id: string; news: NewsResult[] } & Omit<NewsProvider, "getNews">)[]
> = {
  async GET(_req, ctx) {
    const newsProvidersIds = Object.keys(newsProviders);

    const newsResults = await Promise.allSettled(
      newsProvidersIds.map((id) => newsProviders[id].getNews(1)),
    );

    const data = newsProvidersIds.map((id, index) => ({
      id: id,
      name: newsProviders[id].name,
      logo: newsProviders[id].logo,
      website: newsProviders[id].website,
      news:
        (newsResults[index] as PromiseFulfilledResult<NewsResult[]>).value ||
        [],
    }));

    return ctx.render(data);
  },
};

export default function Home(props: PageProps) {
  return (
    <div class="container">
      <News data={props.data} />
    </div>
  );
}
