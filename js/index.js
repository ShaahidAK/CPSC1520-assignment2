/* 
<tr>
  <td>ALBUM NAME HERE</td>
  <td>RELEASE DATE HERE</td>
  <td>ARTIST NAME HERE</td>
  <td>GENRE HERE</td>
  <td>AVERAGE RATING HERE</td>
  <td>NUMBER OF RATINGS HERE</td>
</tr> 
*/
let albumStore;

async function loadAlbumData(){
  //call json 
  const res = await fetch('public/data/albums.json')
  const data = await res.json()
  //copy of data so we dont manipulate the new one
albumStore = [...data]
//show the album stuff from renderAlbum and put it in loadAlbumData so I can see it
renderAlbum(albumStore, document.querySelector("#album-rows"))
}

function renderAlbum(data){
  const tableBody = document.querySelector('#album-rows');

  
data.forEach(album => {
//template and input album data in each "category"
  const template =`  
  <tr>
  <td>${album.album}</td>
  <td>${album.releaseDate}</td>
  <td>${album.artistName}</td>
  <td>${album.genres}</td>
  <td>${album.averageRating}</td>
  <td>${album.numberRatings}</td>
  </tr> 
`;
//table body makes rows of template
tableBody.innerHTML += template;
});
}

//function should search the objects in the array for the artist and artistName
function searchAlbum(searchArtistOrName){
  if (!searchArtistOrName){
  return null //as per indicated
  }
  //filter search results from data (albumstore)
  const searchResults = albumStore.filter(album =>{
  //make them into lowercase just incase
    let artistLower = album.artist.toLowerCase();
    let artistNameLower = album.artistName.toLowerCase();
  
    //return either album.artist or artistName and make them lower
    //also refer the argument passed then ALSO make it lower
    return artistLower.includes(searchArtistOrName.toLowerCase()) ||
    artistNameLower.includes(searchArtistOrName.toLowerCase());
  
  })
  //length of the search is 0, null it
  if (searchResults.length === 0) {
    return null;
  }
  
  return searchResults;
  
  }

  //searching by minrating
  function searchByMinRating(minRating)
  {
    //return null
    if(!minRating){
      return null;
    }
//during the 'search' filter it
    const searchResults = albumStore.filter(album => {
      // Check if the number of ratings is greater or equal to minRating
      return album.numberRatings >= minRating
    });
    if(searchResults.length === 0) {
      return null;
    }
    return searchResults;
  }



document.querySelector('#album-search-form').addEventListener('submit', handleFormSubmit);


function handleFormSubmit(e) {
  e.preventDefault();

   // Get the search query from input field, remove whitespace(s) and put it to lowercase
   const searchQuery = document.getElementById('search-input').value.trim().toLowerCase();

   const minRating = document.getElementById('min-album-rating-input').value;

   renderAlbum(searchResults);
}

loadAlbumData()

