import { useState, useEffect } from "react";

export default function Home() {
  const [searchLink, setSearchLink] = useState("");
  const [message, setMessage] = useState("");
  const [totalArticlesRead, setTotalArticlesRead] = useState(0);
  const [startingDate, setStartingDate] = useState("");

  const handleSearch = async () => {
    const response = await fetch("/api/checkLink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: searchLink }),
    });

    const data = await response.json();
    setMessage(data.message);

    fetchInitialData(); // Fetch initial data after a search is performed
  };

  const fetchInitialData = async () => {
    const response = await fetch("/api/getArticleData");
    const data = await response.json();
    setTotalArticlesRead(data.totalArticlesRead);
    setStartingDate(data.startingDate);
  };

  useEffect(() => {
    fetchInitialData(); // Fetch initial data when the component mounts
  }, []);

  return (
    <div className="container">
      <header className="logo">
        <img src="/google-logo.png" alt="Google" />
      </header>
      <div className="input-container">
        <div className="link-box">
          <input
            type="text"
            className="search-input"
            value={searchLink}
            onChange={(e) => setSearchLink(e.target.value)}
          />
        </div>
        <div className="search-box">
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {message && <p className="message">{message}</p>}
      <p className="article-info">
        You have read <span className="highlight">{totalArticlesRead}</span>{" "}
        articles since <span className="highlight">{startingDate}</span>
      </p>
      <footer className="footer">
        © {new Date().getFullYear()} Satwik Sajja
      </footer>
    </div>
  );
}
