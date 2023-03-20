const key = "k_wpwk6f6z";
//https://imdb-api.com/api/#Search-header

async function movie() {
  const promise = await fetch(
    `https://imdb-api.com/en/API/Title/k_wpwk6f6z/tt0110413`
  );
  const data = await promise.json();
  console.log(data);
}
// movie();
