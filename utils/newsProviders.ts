import { parseHTML } from "npm:linkedom@0.16.8/worker";

export const getIrrawaddy = async (page: number): Promise<Article[]> => {
  const json = await fetch("https://burma.irrawaddy.com/?ajax-request=jnews", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      `data[filter]=0&data[current_page]=${page}&action=jnews_module_ajax_jnews_block_39`,
  }).then((res) => res.json());

  const { document } = parseHTML(json.content);

  const articleElements = [...document.querySelectorAll("article")];

  const data = articleElements.map((ae) => ({
    title: ae
      .querySelector(".jeg_post_title")
      .textContent.trim()
      .replace(/\s+/g, " "),
    date: ae.querySelector(".jeg_post_meta .jeg_meta_date").textContent
      .trim(),
    image: ae.querySelector(".jeg_thumb img")?.getAttribute(
      "data-src",
    ),
    link: ae.querySelector(".jeg_post_title a").href,
  }));

  return data;
};

export const getMyanmarNow = async (page: number): Promise<Article[]> => {
  const html = await fetch(`https://myanmar-now.org/mm/page/${page}/?s`).then(
    (res) => res.text(),
  );

  const { document } = parseHTML(html);

  const articleElements = [...document.querySelectorAll(".post-item")];

  const data = articleElements.map((ae) => ({
    title: ae
      .querySelector(".block-post-overlay .block-title-overlay h2.post-title")
      .textContent.trim(),
    date: ae
      .querySelector(".block-post-overlay .block-title-overlay .date")
      .textContent.trim(),
    image: ae.querySelector(".block-post-overlay img")?.src,
    link: ae.querySelector(
      ".block-post-overlay .block-title-overlay h2.post-title a",
    ).href,
  }));

  return data;
};

export const getKhitThit = async (page: number): Promise<Article[]> => {
  const html = await fetch(`https://yktnews.com/page/${page}/?s`).then((res) =>
    res.text()
  );
  const { document } = parseHTML(html);

  const articleElements = [
    ...document.querySelectorAll(
      ".tdb_module_loop.td_module_wrap.td-animation-stack.td-cpt-post",
    ),
  ];

  const data = articleElements.map((ae) => ({
    title: ae
      .querySelector(".td-module-meta-info .td-module-title a")
      .getAttribute("title")
      .trim(),
    date: ae
      .querySelector(".td-module-meta-info .td-editor-date .td-post-date")
      .textContent.trim(),
    image: ae
      .querySelector(".td-image-container .td-module-thumb a span")
      ?.getAttribute("data-img-url"),
    link: ae.querySelector(".td-module-meta-info .td-module-title a").href,
  }));

  return data;
};

export const getAyeyarwaddyTimes = async (
  page: number,
): Promise<Article[]> => {
  const html = await fetch(`https://ayartimes.com/?paged=${page}&s`).then(
    (res) => res.text(),
  );
  const { document } = parseHTML(html);

  const articleElements = [
    ...document.querySelectorAll("article.latest-posts-list"),
  ];

  const data = articleElements.map((ae) => ({
    title: ae.querySelector(".read-details .read-title a").textContent.trim(),
    date: ae
      .querySelector(".read-details .post-item-metadata .posts-date")
      .textContent.trim(),
    image: ae.querySelector(".read-img img")?.src,
    link: ae.querySelector(".read-details .read-title a").href,
  }));

  return data;
};

export const getBbc = async (page: number): Promise<Article[]> => {
  const html = await fetch(
    `https://www.bbc.com/burmese/topics/c404v08p1wxt?page=${page}`,
  ).then((res) => res.text());

  const { document } = parseHTML(html);

  const articleElements = [
    ...document.querySelectorAll('ul[data-testid="topic-promos"] li'),
  ];

  const data = articleElements.map((ae) => ({
    title: ae.querySelector(
      '.promo-text h2 a span[data-testid="visually-hidden-text"]',
    )?.nextSibling?.textContent?.trim() ||
      ae.querySelector(".promo-text h2 a").textContent.trim(),
    date: ae.querySelector(".promo-text time").textContent.trim(),
    image: ae.querySelector(".promo-image img")?.src,
    link: ae.querySelector(".promo-text h2 a").href,
  }));

  return data;
};

export const getRFA = async (page: number): Promise<Article[]> => {
  const html = await fetch(
    `https://www.rfa.org/burmese/@@search?SearchableText=&sort_on=Date&b_start:int=${
      (page - 1) * 30
    }`,
  ).then((res) => res.text());

  const { document } = parseHTML(html);

  const articleElements = [...document.querySelectorAll(".searchresult")];

  const data = articleElements.map((ae) => ({
    title: ae.querySelector(".result-title a").textContent.trim(),
    date: ae.querySelector(".discreet .searchresultdate").textContent.trim(),
    image: ae.querySelector(".teaserimg img")?.src,
    link: ae.querySelector(".result-title a").href,
  }));

  return data;
};

export const getMizzima = async (page: number): Promise<Article[]> => {
  const html = await fetch(
    `https://bur.mizzima.com/page/${page}?s`,
  ).then((res) => res.text());

  const { document } = parseHTML(html);

  const articleElements = [...document.querySelectorAll("#content article")];

  const data = articleElements.map((ae) => ({
    title: ae.querySelector(".mag-post-title").textContent.trim(),
    date: ae.querySelector(".mag-post-meta .post-date .entry-date").textContent
      .trim(),
    image: ae.querySelector(".mag-post-img .post-thumbnail img")?.dataset?.src,
    link: ae.querySelector(".mag-post-title a").href,
  }));

  return data;
};

export const getDelta = async (page: number): Promise<Article[]> => {
  const html = await fetch(
    `https://deltanewsagency.com/%E1%80%9E%E1%80%90%E1%80%84%E1%80%BA%E1%80%B8/page/${page}`,
  ).then((res) => res.text());

  const { document } = parseHTML(html);

  const articleElements = [
    ...document.querySelectorAll("#main-content article"),
  ];

  const data = articleElements.map((ae) => ({
    title: ae.querySelector(".mh-posts-list-header .mh-posts-list-title")
      .textContent.trim(),
    date: ae.querySelector(".mh-posts-list-header .mh-meta a").textContent
      .trim(),
    image: ae.querySelector(".mh-posts-list-thumb img")?.src,
    link: ae.querySelector(".mh-posts-list-header .mh-posts-list-title a").href,
  }));

  return data;
};

export interface Article {
  title: string;
  date: string;
  image?: string;
  link: string;
}

export interface NewsProvider {
  getNews: (page: number) => Promise<Article[]>;
  name: string;
  logo: string;
  website: string;
}

export const newsProviders: Record<string, NewsProvider> = {
  irrawaddy: {
    getNews: getIrrawaddy,
    name: "The Irrawaddy",
    logo:
      "https://burma.irrawaddy.com/wp-content/uploads/2023/03/Burmese-Favicon.svg",
    website: "https://burma.irrawaddy.com",
  },
  myanmarnow: {
    getNews: getMyanmarNow,
    name: "Myanmar Now",
    logo:
      "https://i0.wp.com/myanmar-now.org/mm/wp-content/uploads/sites/7/2023/03/cropped-MN-Icon-300x300-1.png?fit=300%2C300&ssl=1",
    website: "https://myanmar-now.org/mm",
  },
  khitthit: {
    getNews: getKhitThit,
    name: "Khit Thit",
    logo: "https://yktnews.com/wp-content/uploads/2022/01/KT_272x90.png",
    website: "https://yktnews.com",
  },
  ayeyarwaddy: {
    getNews: getAyeyarwaddyTimes,
    name: "Ayeyarwaddy Times",
    logo:
      "https://ayartimes.com/wp-content/uploads/2022/06/cropped-Untitled-design-e1655822095288-192x192.png",
    website: "https://ayartimes.com",
  },
  bbc: {
    getNews: getBbc,
    name: "BBC",
    logo:
      "https://ichef.bbci.co.uk/ace/standard/170/cpsprodpb/295f/live/65e815d0-1a62-11ee-87d1-5feb7aae5bea.png",
    website: "https://www.bbc.com/burmese",
  },
  rfa: {
    getNews: getRFA,
    name: "RFA",
    logo: "https://www.rfa.org/++theme++burmese/rfalogo.png",
    website: "https://www.rfa.org/burmese",
  },
  mizzima: {
    getNews: getMizzima,
    name: "Mizzima",
    logo:
      "https://bur.mizzima.com/wp-content/uploads/2023/10/mizzima-bur_logo_2023.png",
    website: "https://bur.mizzima.com",
  },
  delta: {
    getNews: getDelta,
    name: "Delta News Agency",
    logo:
      "https://deltanewsagency.com/wp-content/uploads/2023/12/cropped-logo3-2.png",
    website: "https://deltanewsagency.com",
  },
};
