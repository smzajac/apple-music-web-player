let results = document.querySelector('.results');
let searchButton = document.querySelector("button");
let searchBox = document.querySelector('.search-input');
let audio = document.querySelector('audio');
let span = document.querySelector('span');
//base url
let base = "https://itunes.apple.com/search?term=";

// enter key functionality
searchButton.addEventListener("click", songRequest);
searchBox.addEventListener("keypress", function(e){
  if (e.keyCode === 13) {
    songRequest();
  }
});

// pull specific song
function songRequest() {
  let query = searchBox.value;
  console.log('Search Query ' + query);
  let url = base + query;
  console.log('full URL ' + url);


  fetch(url).then(function (response) {
    response.json().then(songResults)
  });
}


// pull data from array
  function songResults(data) {
    results.innerHTML = "";
    console.log(`Here is the data: `,data);
    for (var i = 0; i < 10; i++) {
      let sample = data.results[i].previewUrl;
      let artist = data.results[i].artistName;
      let track = data.results[i].trackName;
      let div = document.createElement('div');
      div.setAttribute("class", 'song');
      div.innerHTML = `
        <img src=${data.results[i].artworkUrl100} alt="album cover">
        <p class="song-title">${data.results[i].collectionName}</p>
        <p class="song-title">${data.results[i].trackName}</p>
        <p class="artist-name">${data.results[i].artistName}</p>
      `;

      div.addEventListener("click", playMusic);
      function playMusic() {
        //appends url of the audio class with the selected song
        audio.setAttribute("src", sample);
        //makes audio automatically play
        audio.play();
        // replaces the HTML of the span with the artist and track
        span.innerHTML = `${artist} - ${track}`;
      }
      results.appendChild(div);
      console.log('this will be logged 10 times');
    }
  };






/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
