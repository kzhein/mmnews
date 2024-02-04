import { PageProps } from "$fresh/server.ts";
import { NewProvider } from "../islands/NewProvider.tsx";
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
  const news = props.data;

  return (
    <div class="container">
      <NewProvider
        name="The Irrawaddy"
        logo="https://burma.irrawaddy.com/wp-content/uploads/2023/03/Burmese-Favicon.svg"
        website="https://burma.irrawaddy.com"
        id="irrawaddy"
        news={news.irrawaddy}
      />

      <hr class="border border-primary border-1 opacity-75 w-100" />

      <NewProvider
        name="Myanmar Now"
        logo="https://i0.wp.com/myanmar-now.org/mm/wp-content/uploads/sites/7/2023/03/cropped-MN-Icon-300x300-1.png?fit=300%2C300&ssl=1"
        website="https://myanmar-now.org/mm"
        id="myanmarnow"
        news={news.myanmarnow}
      />

      <hr class="border border-primary border-1 opacity-75 w-100" />

      <NewProvider
        name="Khit Thit"
        logo="https://yktnews.com/wp-content/uploads/2022/01/KT_272x90.png"
        website="https://yktnews.com"
        id="khitthit"
        news={news.khitthit}
      />

      <hr class="border border-primary border-1 opacity-75 w-100" />

      <NewProvider
        name="Ayeyarwaddy Times"
        logo="https://ayartimes.com/wp-content/uploads/2022/06/cropped-Untitled-design-e1655822095288-192x192.png"
        website="https://ayartimes.com"
        id="ayeyarwaddy"
        news={news.ayeyarwaddy}
      />

      <hr class="border border-primary border-1 opacity-75 w-100" />

      <NewProvider
        name="BBC"
        logo="https://ichef.bbci.co.uk/ace/standard/170/cpsprodpb/295f/live/65e815d0-1a62-11ee-87d1-5feb7aae5bea.png"
        website="https://www.bbc.com/burmese"
        id="bbc"
        news={news.bbc}
      />

      <hr class="border border-primary border-1 opacity-75 w-100" />

      <NewProvider
        name="RFA"
        logo="https://www.rfa.org/++theme++burmese/rfalogo.png"
        website="https://www.rfa.org/burmese"
        id="rfa"
        news={news.rfa}
      />
    </div>
  );
}
