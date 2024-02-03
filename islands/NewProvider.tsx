import { useState } from "preact/hooks";

export function NewProvider({ name, logo, website, id, news }) {
  const [myNews, setMyNews] = useState(news);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getMoreNews = async () => {
    setIsLoading(true);

    const res = await fetch(
      `/api/news?provider=${id}&page=${currentPage + 1}`,
    );

    setIsLoading(false);

    if (!res.ok) {
      return alert("Something went wrong while fetching more news! 💥");
    }

    const moreNews = await res.json();

    const myNewsMap = new Map();

    myNews.forEach((mn) => {
      myNewsMap.set(mn.link, mn);
    });
    moreNews.forEach((mn) => {
      myNewsMap.set(mn.link, mn);
    });

    const newsWithoutDuplicates = [];

    myNewsMap.forEach((neww) => {
      newsWithoutDuplicates.push(neww);
    });

    setCurrentPage(currentPage + 1);
    setMyNews(newsWithoutDuplicates);
  };

  return (
    <div class="mb-3">
      <div class="d-flex align-items-center justify-content-center">
        <img
          src={logo}
          alt={name}
          style="object-fit: contain"
          class="me-3"
          width="100"
          height="100"
        />
        <a href={website} target="_blank">
          {name}
        </a>
      </div>
      {myNews.map((neww) => (
        <div class="d-flex align-items-center">
          <img
            src={neww.image || logo}
            alt={neww.title}
            style="object-fit: contain"
            width="130"
            height="100"
            class="me-2"
          />
          <div>
            <a href={neww.link} target="_blank">
              <p>{neww.title}</p>
            </a>
            <p>{neww.date}</p>
          </div>
        </div>
      ))}
      <button
        type="button"
        class="btn btn-primary d-block mx-auto"
        onClick={getMoreNews}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}
