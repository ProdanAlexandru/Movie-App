
const API_kEY = '95a3934d08e250c793a9e0707f97e498';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=95a3934d08e250c793a9e0707f97e498';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';



const searchButton = document.querySelector("#search");
const inputArea = document.querySelector("#inputValue");
const movieArea = document.querySelector("#movie-searchable");
const moviesContainer = document.querySelector("#movies-container");

        function requestMovies(url, onComplete, onError){
            fetch(url) 
            .then((res)=> res.json())
            .then(onComplete)
            .catch(onError);
        }

        function searchMovie(value){
            const path = "/search/movie";
            const url = generateUrl(path) + "&query=" +value;
            requestMovies(url,renderSearchMovies,handleError);

        }
        function getUpcomingMovies(){
            const path = "/movie/upcoming";
            const url = generateUrl(path);
            const render = renderMovies.bind({ title: 'Upcoming Movies'});
            requestMovies(url,render,handleError);

        }
        
        function getTopRatedMovies(){
            const path = "/movie/top_rated";
            const url = generateUrl(path);
            const render = renderMovies.bind({ title: 'Top Rated Movies'});
            requestMovies(url,render,handleError);

        }
        function getPopularMovies(){
            const path = "/movie/popular";
            const url = generateUrl(path);
            const render = renderMovies.bind({ title: 'Most Popular Movies'});
            requestMovies(url,render,handleError);

        }

        function handleError(error){
            console.log("Error:",error);
        }

        function generateUrl(path) {
            const url = `https://api.themoviedb.org/3${path}?api_key=95a3934d08e250c793a9e0707f97e498`;
            return url;
        }        


        function movieSection(movies){
            return movies.map((movie)=>{
                if (movie.poster_path) {
                return `<img 
                    src=${IMAGE_URL + movie.poster_path} 
                    data-movie-id=${movie.id}
                />`;
                }
            })
        }


        function createMovieContainer(movies, title= ''){
            const movieElement = document.createElement('div');
            movieElement.setAttribute('class','movie');

            const movieTemplate = `
            <h2>${title}</h2>
            <section class="section">
                ${movieSection(movies)}
            </section>
            <div class= "content">
            <p id="content-close">X</p>
            </div>
            `;

            movieElement.innerHTML = movieTemplate;
            return movieElement;
        }

        function renderSearchMovies(data){
            movieArea.innerHTML = '';
            const movies = data.results;
                const movieBlock = createMovieContainer(movies);
                movieArea.appendChild(movieBlock);
                console.log('Data:' , data); 
        }
        
        function renderMovies(data){ 
            const movies = data.results;
                const movieBlock = createMovieContainer(movies, this.title);
                moviesContainer.appendChild(movieBlock);
                console.log('Data:' , data); 
        }

searchButton.onclick = function(event){
    event.preventDefault();
    const value = inputArea.value;
    
    searchMovie(value);

    inputArea.value = "";
    console.log ("Value:", value);
     
}

        function createIframe(video) {
            const iframe = document.createElement("iframe");
            iframe.src = `https:/www.youtube.com/embed/${video.key}`;
            iframe.width = 360;
            iframe.height = 315;
            iframe.allowFullscreen = true;

            return iframe;
        }
        
        function createVideoTemplate(data, content) {
            content.innerHTML = '<p id="content-close">X</p>';

            console.log("Videos", data);

            const videos = data.results;
            const length = videos.length > 4 ? 4 : videos.length;
            const iframeContainer = document.createElement("div");

            for (let i=0 ; i< length; i++){
                const video = videos[i];
                const iframe = createIframe(video);
                iframeContainer.appendChild(iframe);
                content.appendChild(iframeContainer);
            }
        }


document.onclick = function (event) {

    const target = event.target;
    if (target.tagName.toLowerCase() === "img"){
        console.log("image clicked");
        const movieId = target.dataset.movieId;
        console.log (movieId);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add("content-display");

        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        fetch(url)
            .then((res)=> res.json())
            .then((data) => createVideoTemplate(data,content))
            .catch((error)=>{
                console.log('Error:', error);
            });
    }
    
    if (target.id ==="content-close"){
        const content = target.parentElement;
        content.classList.remove("content-display"); 
    }
    
}
 getUpcomingMovies();

 getTopRatedMovies();

getPopularMovies();