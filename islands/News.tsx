import { useState } from "preact/hooks";
import { NewProvider } from "./NewProvider.tsx";

export default function News({ news }) {
  const [current, setCurrent] = useState("irrawaddy");

  return (
    <>
      <ul class="nav nav-pills justify-content-evenly my-4">
        <li class="nav-item">
          <button
            class={`nav-link ${current === "irrawaddy" ? "active" : ""}`}
            aria-current="page"
            onClick={() => setCurrent("irrawaddy")}
          >
            The Irrawaddy
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${current === "myanmarnow" ? "active" : ""}`}
            onClick={() => setCurrent("myanmarnow")}
          >
            Myanmar Now
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${current === "khitthit" ? "active" : ""}`}
            onClick={() => setCurrent("khitthit")}
          >
            Khit Thit
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${current === "ayeyarwaddy" ? "active" : ""}`}
            onClick={() => setCurrent("ayeyarwaddy")}
          >
            Ayeyarwaddy Times
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${current === "bbc" ? "active" : ""}`}
            onClick={() => setCurrent("bbc")}
          >
            BBC
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${current === "rfa" ? "active" : ""}`}
            onClick={() => setCurrent("rfa")}
          >
            RFA
          </button>
        </li>
        <li class="nav-item">
          <button
            class={`nav-link ${current === "mizzima" ? "active" : ""}`}
            onClick={() => setCurrent("mizzima")}
          >
            Mizzima
          </button>
        </li>
      </ul>

      <div class={current === "irrawaddy" ? "d-block" : "d-none"}>
        <NewProvider
          name="The Irrawaddy"
          logo="https://burma.irrawaddy.com/wp-content/uploads/2023/03/Burmese-Favicon.svg"
          website="https://burma.irrawaddy.com"
          id="irrawaddy"
          news={news.irrawaddy}
        />
      </div>

      <div class={current === "myanmarnow" ? "d-block" : "d-none"}>
        <NewProvider
          name="Myanmar Now"
          logo="https://i0.wp.com/myanmar-now.org/mm/wp-content/uploads/sites/7/2023/03/cropped-MN-Icon-300x300-1.png?fit=300%2C300&ssl=1"
          website="https://myanmar-now.org/mm"
          id="myanmarnow"
          news={news.myanmarnow}
        />
      </div>

      <div class={current === "khitthit" ? "d-block" : "d-none"}>
        <NewProvider
          name="Khit Thit"
          logo="https://yktnews.com/wp-content/uploads/2022/01/KT_272x90.png"
          website="https://yktnews.com"
          id="khitthit"
          news={news.khitthit}
        />
      </div>

      <div class={current === "ayeyarwaddy" ? "d-block" : "d-none"}>
        <NewProvider
          name="Ayeyarwaddy Times"
          logo="https://ayartimes.com/wp-content/uploads/2022/06/cropped-Untitled-design-e1655822095288-192x192.png"
          website="https://ayartimes.com"
          id="ayeyarwaddy"
          news={news.ayeyarwaddy}
        />
      </div>

      <div class={current === "bbc" ? "d-block" : "d-none"}>
        <NewProvider
          name="BBC"
          logo="https://ichef.bbci.co.uk/ace/standard/170/cpsprodpb/295f/live/65e815d0-1a62-11ee-87d1-5feb7aae5bea.png"
          website="https://www.bbc.com/burmese"
          id="bbc"
          news={news.bbc}
        />
      </div>

      <div class={current === "rfa" ? "d-block" : "d-none"}>
        <NewProvider
          name="RFA"
          logo="https://www.rfa.org/++theme++burmese/rfalogo.png"
          website="https://www.rfa.org/burmese"
          id="rfa"
          news={news.rfa}
        />
      </div>

      <div class={current === "mizzima" ? "d-block" : "d-none"}>
        <NewProvider
          name="Mizzima"
          logo="https://bur.mizzima.com/wp-content/uploads/2023/10/mizzima-bur_logo_2023.png"
          website="https://bur.mizzima.com/"
          id="mizzima"
          news={news.mizzima}
        />
      </div>
    </>
  );
}
