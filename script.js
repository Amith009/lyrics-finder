document.getElementById('searchButton').addEventListener('click', searchSong);

function searchSong() {
    var artist = document.getElementById('searchArtist').value;
    var title = document.getElementById('searchTitle').value;

    if (artist === '' || title === '') {
        alert('Please enter both artist and song title');
        return;
    }

    console.log('Searching for:', artist, title);
    fetchLyrics(artist, title);
}

function fetchLyrics(artist, title) {
    var url = 'https://api.lyrics.ovh/v1/' + encodeURIComponent(artist) + '/' + encodeURIComponent(title);

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log('Lyrics data:', data);
            if (data.lyrics) {
                displayLyrics(data.lyrics);
            } else {
                document.getElementById('lyrics').innerHTML = '<p>Lyrics not found.</p>';
            }
        })
        .catch(function(error) {
            console.error('Error fetching lyrics:', error);
        });
}

function displayLyrics(lyrics) {
    document.getElementById('lyrics').innerHTML = '<h3>Lyrics</h3><pre>' + lyrics + '</pre>';
}
