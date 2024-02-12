import { parseHTML } from "npm:linkedom@0.16.8/worker";

export const getIrrawaddy = async (page: number) => {
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
    date: ae.querySelector(".jeg_post_meta .jeg_meta_date").textContent.trim(),
    image: ae.querySelector(".jeg_thumb img")?.getAttribute("data-src"),
    link: ae.querySelector(".jeg_post_title a").href,
  }));

  return data;
};

export const getMyanmarNow = async (page: number) => {
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

export const getKhitThit = async (page: number) => {
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

export const getAyeyarwaddyTimes = async (page: number) => {
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

export const getBbc = async (page: number) => {
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

export const getRFA = async (page: number) => {
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

export const getMizzima = async (page: number) => {
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

export const getNewsMap = {
  "irrawaddy": getIrrawaddy,
  "myanmarnow": getMyanmarNow,
  "khitthit": getKhitThit,
  "ayeyarwaddy": getAyeyarwaddyTimes,
  "bbc": getBbc,
  "rfa": getRFA,
  "mizzima": getMizzima,
};
