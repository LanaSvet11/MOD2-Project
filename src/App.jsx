import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import MovieBox from "./components/MovieBox";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  FormControl,
  Nav,
  Navbar,
  Form,
} from "react-bootstrap";
import { mainContext } from "./context/primaryContext";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=fddbc1e326c19de6fc96217d56eb7a98";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=<<api_key_here>>&query";

function App() {
  const [query, setQuery] = useState("");

  const { movies, setMovies } = useContext(mainContext);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=fddbc1e326c19de6fc96217d56eb7a98&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      let filteredMovies = data.results.filter((movie) => movie.id !== 617932);
      setMovies(filteredMovies);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">MovieDb App</Navbar.Brand>
          <Navbar.Brand href="/home">Popular</Navbar.Brand>
          <Navbar.Toggle area-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex" onSubmit={searchMovie}>
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                area-lable="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => (
                <MovieBox key={movieReq.id} {...movieReq} />
              ))}
            </div>
          </div>
        ) : (
          <h2>Sorry!! No Movies Found</h2>
        )}
      </div>
    </>
  );
}

export default App;
