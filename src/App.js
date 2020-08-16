import React from 'react';
import Row from "./Components/Row";
import Banner from "./Components/Banner"
import Nav from "./Components/Nav"
import './App.css';
import requests from './requests'


function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <Nav />
      {/* Banner */}
      <Banner />

      <Row title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetflixOriginals} isLargeRow={true} />
      <Row title="Top Rated " fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romantic Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />


    </div>
  );
}

export default App;
