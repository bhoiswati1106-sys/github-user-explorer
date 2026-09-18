import { getUser, getRepositories } from "./api.js";

const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");

const repoSearch = document.getElementById("repoSearch");
const sortRepos = document.getElementById("sortRepos");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const userContainer = document.getElementById("userContainer");
const recentUsersContainer = document.getElementById("recentUsers");

const categoryTabs = document.querySelectorAll(".category-tabs button");

let currentRepositories = [];
let recentUsers =JSON.parse(localStorage.getItem("recentUsers")) || [];

searchBtn.addEventListener("click", searchUser);

usernameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchUser();
  }
});

async function searchUser() {
  const username = usernameInput.value.trim();
  localStorage.setItem("lastUsername", username);

  if (username === "") {
    error.textContent = "Please enter a GitHub username.";
    return;
  }

  error.textContent = "";
  loading.textContent = "Loading...";
  userContainer.innerHTML = "";

  try {
    const user = await getUser(username);
    currentRepositories = await getRepositories(username);

    if (!recentUsers.includes(username)){
    recentUsers.push(username);
    localStorage.setItem("recentUsers", JSON.stringify(recentUsers));
    }

    displayRecentUsers();

  

    loading.textContent = "";

    userContainer.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="120">
             <h2>${user.name || user.login}</h2>
             <p>${user.bio || "No bio available"}</p>
             <p>Followers: ${user.followers}</p>
             <p>Following: ${user.following}</p>
             <p>Public Repositories: ${user.public_repos}</p>

             <h3>Repositories</h3>

             <ul>
               ${currentRepositories
                 .map(
                   (repo) => `
                <li>
                  <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                  <span> ⭐ ${repo.stargazers_count}</span>
                </li>
              `,
                 )
                 .join("")}
            </ul>

               
             `;
  } catch (err) {
    loading.textContent = "";
    error.textContent = err.message;
  }
}

repoSearch.addEventListener("input", filterRepositories);

sortRepos.addEventListener("change", sortRepositories);

function sortRepositories() {
  const sortValue = sortRepos.value;

  const sortedRepositories = [...currentRepositories];

  if (sortValue === "stars-desc") {
    sortedRepositories.sort((a,b) => b.stargazers_count - a.stargazers_count);
  }

  if (sortValue === "stars-asc") {
    sortedRepositories.sort((a,b) =>
    a.stargazers_count - b.stargazers_count);
  }

  if (sortValue === "name-asc") {
    sortedRepositories.sort((a,b) =>
    a.name.localeCompare(b.name));
  }

  if (sortValue === "name-desc") {
    sortedRepositories.sort((a,b) =>
    b.name.localeCompare(a.name));
  }

  displayRepositories(sortedRepositories);
}

function filterRepositories() {
  const searchText = repoSearch.value.toLowerCase();

  const filteredRepositories = currentRepositories.filter(repo =>
    repo.name.toLowerCase().includes(searchText)
  );

  displayRepositories(filteredRepositories);
}

function displayRepositories(repositories) {
  const repoList = document.querySelector("#userContainer ul");

  if (!repoList) {
    return;
  }

  if (repositories.length === 0) {
    repoList.innerHTML = "<li>No repositories found.</li>";
    return;
  }

  repoList.innerHTML = repositories.map(repo =>`
     <li>
       <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
       <span> ⭐ ${repo.stargazers_count}</span>
      </li>
  `).join("");
}

categoryTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const language = tab.dataset.language;

    if (language === "all") {
      displayRepositories(currentRepositories);
      return;
    }

    const filteredRepositories = currentRepositories.filter(
      repo => repo.language === language
    );

    displayRepositories(filteredRepositories);
  });
});

function displayRecentUsers() {
  recentUsersContainer.innerHTML = recentUsers
   .map(username => `<button data-username="${username}">${username}</button>`)
   .join("");

   const recentButtons = recentUsersContainer.querySelectorAll("button");

   recentButtons.forEach(button => {
    button.addEventListener("click", () => {
      usernameInput.value = button.dataset.username;
      searchUser();
    });
   });
}

const lastUsername = localStorage.getItem("lastUsername");

if (lastUsername) {
  usernameInput.value = lastUsername;
  searchUser();
}