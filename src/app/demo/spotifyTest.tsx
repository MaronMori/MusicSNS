import { useEffect, useState } from "react";

function SpotifyTest() {
  const [userSpotifyData, setSpotifyData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/spotifyAPI");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSpotifyData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchData();
  }, []);

  if (!userSpotifyData) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <ul>
        {userSpotifyData.recentTracks.item.map((track, index) => {
          <li key={index}>
            {track.track.name} by {track.track.artist[0].name}
          </li>;
        })}
      </ul>
    </div>
  );
}

export default SpotifyTest;
