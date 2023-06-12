const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTVjMTExNTE0YjQyM2EzZDQwMmViNmI1MmEwYmQ3ZCIsInN1YiI6IjY0NzViNmZmYzI4MjNhMDBhOGQ0ZDYxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qbVnLiAG-Tko-JqhOGT1xsDgqOTjCtoVzvdQw43mBdM",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    let rows = data["results"];
    let temp_html = ``;
    rows.forEach((a) => {
      let title = a["title"];
      let id = a["id"];
      let image = "https://image.tmdb.org/t/p/w500/" + a["backdrop_path"];
      let content = a["overview"];
      let rating = a["vote_average"];

      temp_html += `<div class="col" onclick="alert('영화ID : ' + ${id})">
        <img
          src="${image}"
          alt="${title}"
        />
        <h3>${title}</h3>
        <p>${content}</p>
        <p>평점 : ${rating}</p>
        </div>`;
    });
    document.getElementById("cards").innerHTML = temp_html;
  })
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

// 검색기능
function search() {
  const input_val = document.getElementById("searchInput").value;
  if (!input_val) {
    alert("영화 제목을 한 글자 이상 입력해 주세요!");
  }
  const keywords = input_val.toUpperCase();
  const movieList = document.getElementById("cards");
  // const array = [];
  // const array = new Array();
  Array.from(movieList.childNodes).filter((item) => {
    const title = item.getElementsByTagName("h3")[0].innerText;
    if (title.toUpperCase().indexOf(keywords) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

// enter 기능
function enterKey() {
  if (window.event.keyCode == 13) {
    search();
  }
}
