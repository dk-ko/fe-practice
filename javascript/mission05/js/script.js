async function fetchUser(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    const data = await response.json();

    if (data.message === "Not Found") {
      return null;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log("에러 발생: ", error);
    return null;
  }
}

async function fetchRepos(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );
    const data = await response.json();

    if (data.message === "Not Found") {
      return null;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log("에러 발생: ", error);
    return null;
  }
}

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const debounceFetchUser = debounce(async (username) => {
  const userData = await fetchUser(username);
  updateUI(userData);
}, 100);

const debounceFetchRepos = debounce(async (username) => {
  const reposData = await fetchRepos(username);
  updateRepos(reposData);
}, 100);

function updateRepos(reposData) {
  if (!reposData || reposData.status === 403) {
    console.log("레포지토리 정보를 찾을 수 없습니다.");
    document.querySelector(".repo-container").style.display = "none";
    return;
  }

  document.querySelector(".repo-container").style.display = "block";
  reposData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const reposList = document.querySelector(".repo-list");
  reposList.innerHTML = "";

  reposData.slice(0, 3).forEach((repo) => {
    const repoItem = document.createElement("div");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `
        <a href="${repo.html_url}">${repo.name}</a>
          <div class="repo-stats">
            <span class="blue">Stars: ${repo.stargazers_count}</span>
            <span class="gray">Watchers: ${repo.watchers_count}</span>
            <span class="green">Forks: ${repo.forks_count}</span>
          </div>
        `;
    reposList.appendChild(repoItem);
  });
}

function updateUI(userData) {
  if (!userData || userData.status === 403) {
    console.log("유저 정보를 찾을 수 없습니다.");
    showErrorMessage();
    document.querySelector(".profile-container").style.display = "none";
    return;
  }

  console.log(`userData: ${userData}`);
  document.querySelector(".profile-container").style.display = "block";
  document.querySelector("#profile-img").src = userData.avatar_url;

  const blue = document.querySelector(".blue");
  blue.textContent = blue.textContent.replace(
    /\d+$/,
    userData.public_repos || 0
  );

  const gray = document.querySelector(".gray");
  gray.textContent = gray.textContent.replace(/\d+$/, userData.public_gists);

  const green = document.querySelector(".green");
  green.textContent = green.textContent.replace(/\d+$/, userData.followers);

  const teal = document.querySelector(".teal");
  teal.textContent = teal.textContent.replace(/\d+$/, userData.following);

  document.querySelector("#info-company").textContent = userData.company;
  document.querySelector("#info-location").textContent = userData.location;
  document.querySelector("#info-website").textContent = userData.blog;
  document.querySelector("#info-since").textContent = userData.created_at;
  document.querySelector(".profile-btn").src = userData.html_url;
}

function showErrorMessage() {
  const error = document.querySelector(".error");
  error.style.display = "block";

  setTimeout(() => {
    error.style.display = "none";
  }, 2000);
}

const searchInput = document.querySelector(".search-box");

searchInput.addEventListener("input", (event) => {
  const username = event.target.value.trim();
  if (username) {
    debounceFetchUser(username);
    debounceFetchRepos(username);
  }
});
