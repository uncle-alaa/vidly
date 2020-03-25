import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService"
import Pagination from './pagination'
import ListGroup from './listgroup'
import { paginate } from './utilis/paginate'
import MoviesTable from "./moviesTable"
import _ from 'lodash'


class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: 'title', order: "asc" }

  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All genres" }, ...getGenres()]
    this.setState({
      movies: getMovies(),
      genres
    })

  }

  handleLike = movie => {
    const movies = [...this.state.movies]

    const index = movies.indexOf(movie)
    movies[index].like = !movies[index].like
    this.setState({ movies })
  }
  handlePageChance = (page) => {
    this.setState({ currentPage: page })

  }
  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };
  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre, currentPage: 1
    })
  }
  handleSort = sortColumn => {

    this.setState({ sortColumn })
  }
  render() {

    const { length: count } = this.state.movies;
    const { currentPage, pageSize, selectedGenre, sortColumn, movies: allMovies } = this.state
    if (count === 0) return <p>there are no movies in the database</p>;
    const filtered = selectedGenre && selectedGenre._id ?
      allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movies = paginate(sorted, currentPage, pageSize)


    return (
      <div className="row">

        <div className="col-2">
          <ListGroup
            selectedItem={this.state.selectedGenre}
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect} /></div>
        <div className="col">
          <p> showing {filtered.length} movies </p>
          <p> on master branche </p>
          <MoviesTable
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            movies={movies}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn} />

          <Pagination itemsCount={filtered.length} currentPage={currentPage}
            pageSize={pageSize} onPageChange={this.handlePageChance} />
        </div>
      </div>
    );
  }


}
export default Movies;
