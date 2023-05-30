import keyboardArray from '../Data.js';
const ratingsList = document.querySelector('#rating-list')

const videoName = document.querySelector('#videoName');
let player;

function handleSubmit(e) {
    e.preventDefault();

    const rating = document.querySelector('input[name="rating"]:checked').value;
    const videoName = document.getElementById("videoName").textContent;

    const body = {
        name: videoName,
        rating: rating
    };

    axios.post('http://localhost:4004/ratings', body)
        .then(() => {
            // document.getElementById("videoName").textContent = '';
            getRatings();
        })
        .catch(error => {
            console.log(error);
        });
}

function getRatings() {
    axios.get('http://localhost:4004/ratings/')
        .then(res => {
            ratingsList.innerHTML = '';
            res.data.forEach(elem => {
                let ratingsCard = `<div class="ratings-card">
                    <h2>${elem.name}</h2>
                    <h3>Rating: ${elem.rating}/5</h3>
                    <button class="delete-btn" data-id="${elem.ratings_id}">Delete</button>
                    </div>
                `;

                ratingsList.innerHTML += ratingsCard
            });
        })
        .catch(error => {
            console.log(error);
        });
}

ratingsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const id = event.target.getAttribute('data-id');
        deleteRating(id);
    }
});

function deleteRating(id) {
    axios.delete(`http://localhost:4004/ratings/${id}`)
        .then(() => getRatings())
        .catch(err => console.log(err))
}

let currentIndex = 0;
const changeVideoBtn = document.getElementById("changeVideoBtn");

changeVideoBtn.addEventListener("click", () => {
    changeVideo();
});

window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: keyboardArray[currentIndex].videoId,
    events: {
      'onReady': onPlayerReady
    }
  });
  console.log('YouTube API ready');
};

function changeVideo() {
  currentIndex = (currentIndex + 1) % keyboardArray.length;
  const videoId = keyboardArray[currentIndex].videoId;
  
  videoNameDisplay();
  loadVideoById(videoId);
  console.log('Youtube video changed');
}

function loadVideoById(videoId) {
    player.loadVideoById(videoId);
}

function videoNameDisplay() {
  const videoName = keyboardArray[currentIndex].name;
  document.getElementById("videoName").textContent = videoName;
}

function onPlayerReady(event) {
  event.target.playVideo();

  videoNameDisplay();
}

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', handleSubmit);

getRatings();

