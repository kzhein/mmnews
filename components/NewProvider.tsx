export function NewProvider({ name, logo, website, id, news }) {
  return (
    <div class="mb-3">
      <div class="d-flex align-items-center justify-content-center">
        <img
          src={logo}
          alt={name}
          style="width: 100px; height: 100px; object-fit: contain"
          class="me-3"
        />
        <a href={website} target="_blank">
          {name}
        </a>
      </div>
      {news.map((neww) => (
        <div class="d-flex align-items-center">
          <img
            src={neww.image}
            alt={neww.title}
            style="width: 130px; height: 100px; object-fit: contain"
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
    </div>
  );
}
