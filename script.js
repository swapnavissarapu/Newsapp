const API_KEY = '1a0657de63b11a4da8039de4de65b793';

function fetchNews() {
  const q = document.getElementById('searchInput').value.trim() || 'తెలంగాణ';
  const lang = document.getElementById('languageSelect').value;
  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=${lang}&max=10&apikey=${API_KEY}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    })
    .then(data => showNews(data.articles))
    .catch(err => {
      console.error('Error:', err);
      document.getElementById('newsList').innerHTML = '<p>No news found.</p>';
    });
}

function showNews(articles) {
  const container = document.getElementById('newsList');
  container.innerHTML = '';

  if (!articles || articles.length === 0) {
    container.innerHTML = '<p>No news found.</p>';
    return;
  }

  articles.forEach(article => {
    const div = document.createElement('div');
    div.className = 'news-item';

    div.innerHTML = `
      <img src="${article.image || 'https://via.placeholder.com/120x80?text=No+Image'}" alt="news">
      <div class="news-details">
        <div class="news-title"><a href="${article.url}" target="_blank">${article.title}</a></div>
        <div class="news-snippet">${article.description || ''}</div>
      </div>
    `;

    container.appendChild(div);
  });
}

// Load default Telugu news on page load
window.onload = fetchNews;
