import { useState } from "preact/hooks";
import { NewProvider } from "./NewProvider.tsx";
import { NewsProvider, NewsResult } from "../utils/newsProviders.ts";

interface NewsProps {
  data: ({ id: string; news: NewsResult[] } & Omit<NewsProvider, "getNews">)[];
}

export default function News({ data }: NewsProps) {
  const [current, setCurrent] = useState(data[0].id);

  return (
    <>
      <ul class="nav nav-pills justify-content-evenly my-4">
        {data.map((dt) => (
          <li class="nav-item">
            <button
              class={`nav-link ${current === dt.id ? "active" : ""}`}
              aria-current="page"
              onClick={() => setCurrent(dt.id)}
            >
              {dt.name}
            </button>
          </li>
        ))}
      </ul>

      {data.map((dt) => (
        <div class={current === dt.id ? "d-block" : "d-none"}>
          <NewProvider
            name={dt.name}
            logo={dt.logo}
            website={dt.website}
            id={dt.id}
            news={dt.news}
          />
        </div>
      ))}
    </>
  );
}
