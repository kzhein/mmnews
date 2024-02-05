import { PageProps } from "$fresh/server.ts";
import News from "../islands/News.tsx";
import {
  getAyeyarwaddyTimes,
  getBbc,
  getIrrawaddy,
  getKhitThit,
  getMyanmarNow,
  getRFA,
} from "../utils/newsProviders.ts";

export const handler: Handlers<Project> = {
  async GET(_req, ctx) {
    const news = await Promise.allSettled([
      getIrrawaddy(1),
      getMyanmarNow(1),
      getKhitThit(1),
      getAyeyarwaddyTimes(1),
      getBbc(1),
      getRFA(1),
    ]);

    const data = {
      "irrawaddy": news[0].value || [],
      "myanmarnow": news[1].value || [],
      "khitthit": news[2].value || [],
      "ayeyarwaddy": news[3].value || [],
      "bbc": news[4].value || [],
      "rfa": news[5].value || [],
    };

    return ctx.render(data);
  },
};

export default function Home(props: PageProps) {
  return (
    <div class="container">
      <News news={props.data} />
    </div>
  );
}
