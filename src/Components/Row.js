import React, { useState, useEffect } from 'react'
import axios from '../axios';
import './Row.css'
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
const baseImgURL = "https://image.tmdb.org/t/p/original/"

export default function Row(props) {
    const { title, fetchURL, isLargeRow } = props;

    // * State to initalize the movies
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    // To run this snippet of code on a specific condition

    useEffect(() => {
        // if [],run once when the row loads, and don't run again

        async function fetchDATA() {
            const request = await axios.get(fetchURL);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }

        fetchDATA();

    }, [fetchURL]);

    // console.table(movies);

    const opts = {
        height: "390",
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters,
            autoplay: 1,
        }
    }

    const handleClick = (movie) =>{
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            movieTrailer(movie?.name || "")
            .then((url)=>{
                console.log(url);
                const urlParams = new URLSearchParams(new URL(url).search);
                // setTrailerUrl(urlParams.get('v'));
                setTrailerUrl(urlParams.get('v'));
            }).catch(err => console.log('Error',err));
        }
    }

    return (
        <div className="row">
            {/* Title of the row */}
            <h2>{title}</h2>

            <div className="row-posters">
                {/* row posters */}

                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={()=>handleClick(movie)}
                        className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                        src={`${baseImgURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}
