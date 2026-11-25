# 🐙 GitHub User Explorer

A web app to search any GitHub user and explore their profile and repositories using the GitHub REST API.

🔗 **Live Demo:** https://bhoiswati1106-sys.github.io/github-user-explorer/


![GitHub User Explorer Screenshot](docs/screenshot.png)

## ✨ Features

- Search a GitHub username to view the user's profile card
- Search repositories by name
- Sort repositories by stars (high to low)
- Filter repositories by language (All, JavaScript, HTML, CSS)
- Recent users history for quick access
- Responsive design for different screen sizes

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- [GitHub REST API](https://docs.github.com/en/rest)

## 📁 Project Structure

```
github-user-explorer/
├── index.html
├── style.css
├── script.js
├── docs/
│   └── screenshot.png
└── README.md
```

> Update the file names above to match your repository.

## 🚀 How to Run Locally

1. Clone the repository
   ```bash
   git clone https://github.com/bhoiswati1106-sys/[your-repo-name].git
   ```
2. Open the project folder
   ```bash
   cd [your-repo-name]
   ```
3. Open `index.html` in your browser. No API key is needed.

> The GitHub API allows a limited number of requests per hour for unauthenticated users. If the app stops loading data, wait a while and try again.

## 📚 What I Learned

- Fetching and displaying data from a REST API using the Fetch API
- Rendering the UI dynamically with JavaScript and DOM manipulation
- Managing client-side state for search, filter and sort together
- Handling loading and error cases when a user is not found

## 🔮 Future Improvements

- Add more sorting options (for example, by name or last updated)
- Add pagination for users with many repositories
- Show more profile details such as followers and following

## 👩‍💻 Author

**Swati Bhoi** — BCA Student & Frontend Web Developer
