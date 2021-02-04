import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { connect } from "react-redux";
import { addMovie, deleteMovie, getListMovies } from "../actions";
import { getListMoviesSelector } from "../selector";
import { trim, isEmpty, filter, parseInt, } from "lodash";

import { createStructuredSelector } from "reselect";

export function Home(props) {
  const [dataSource, setDataSource] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  // console.log("props.listMoviesss", props.listMovies);

  useEffect(() => {
    props.getListMovies();
  }, []);

  useEffect(() => {
    setDataSource(props.listMovies);
  }, [props.listMovies]);

  // const mounted = useRef();
  // useEffect(() => {
  //   if (!mounted.current) {
  //     // do componentDidMount logic
  //     mounted.current = true;
  //   } else {
  //     // do componentDidUpdate logic
  //     setDataSource(props.listMovies);
  //   }
  // }, [props.listMovies]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 50,
      fixed: "right",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      fixed: "right",
    },
    {
      title: "Release Year",
      dataIndex: "releaseYear",
      key: "releaseYear",
      width: 150,
      fixed: "right",
    },
    {
      title: "Options",
      dataIndex: "options",
      width: 100,
      fixed: "right",
      render: (_, movie) => (
        <button
          onClick={() => {
            console.log("Deleted", movie.id);
            props.deleteMovie(movie.id);
          }}
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <div style={{ backgroundColor: "white", marginLeft: 100 }}>
      <h2>Home</h2>
      <form>
        <label className="movieName" style={{ flexDirection: "row" }}>
          <label style={{ marginRight: 10 }}>Search for movie's name:</label>
          <input
            type="text"
            name="Movie name"
            onChange={(value) => {
              console.log(value.target.value);
              let newData = props.listMovies;
              if (!isEmpty(value.target.value)) {
                newData = filter(props.listMovies, (item) => {
                  const text = trim(value.target.value.toUpperCase());
                  const itemData = item.name
                    ? item.name.toUpperCase()
                    : "".toUpperCase();
                  return itemData.indexOf(text) > -1;
                });
              }
              console.log("newDataaaaa", newData);
              setDataSource(newData);
            }}
          />
        </label>
      </form>
      <Table bordered dataSource={dataSource} columns={columns} />
      <input
            style={{paddingLeft: 10}}
            type="text"
            name="movieName"
            placeholder="Movie name"
            onChange={(value) => {
              console.log('name', value.target.value);  
              setMovieName(value.target.value);       
            }}
          />
      <input
            style={{margin: 10, paddingLeft: 10}}
            type="text"
            name="releaseYear"
            placeholder="Release Year"
            onChange={(value) => {
              console.log('releaseYear', value.target.value);  
              setReleaseYear(value.target.value);            
            }}
          />
          <button onClick={() => {
            // console.log('Added movie');
            // console.log('Movie name', movieName);
            // console.log('Release Year', releaseYear);
            let max = 0;
            // console.log('length', dataSource.length);
            for (let i = 0; i < dataSource.length; i++) {
              if(parseInt(dataSource[i].id)  > max) {
                max = parseInt(dataSource[i].id);
              }
            }
            // console.log('maxxxxx', max);
            props.addMovie(max+1, movieName, releaseYear);
          }}>Add movie</button>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  listMovies: getListMoviesSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListMovies: () => {
      dispatch(getListMovies());
    },
    deleteMovie: (id) => {
      dispatch(deleteMovie(id));
    },
    addMovie: (id, movieName, releaseYear) => {
      dispatch(addMovie(id, movieName, releaseYear));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
