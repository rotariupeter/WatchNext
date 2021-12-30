import React,{useState,useEffect, Button, Container } from 'react';
import { getUserFavoriteMovies } from '../../api/ClientService';
import {fetchUserData} from '../../api/authenticationService';
import MovieDetailsDrawerForm from '../MovieDetailsDrawerForm';
import '../../css/UserMovies.css';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Table, Spin, Empty } from 'antd';
import { DesktopOutlined, LoadingOutlined } from '@ant-design/icons';


const columns = fetchMovies => [ {
            title: 'Movie Name',
            dataIndex: 'movieName',
            key: 'movieId',
        }, {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
        }, {
            title: 'Duration(min)',
            dataIndex: 'durationInMin',
            key: 'durationInMin',
        }, {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        }
    ];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function UserMovies(){

    const dispatch=useDispatch();
    const[movies, setMovies] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const[selectedMovieID, setMovieID] = useState([]);
    const[selectedMovieIsFavorite, setMovieIsFavorite] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);

    let history = useHistory();

     useEffect(() => {
            console.log("component UserMovies is mounted");
            clear();
            fetchMovies();
     }, []);

     useEffect(() => {
             if(!showDrawer){
                 clear();
                 fetchMovies();
             }
          }, [showDrawer]);



     const fetchMovies = () =>
        getUserFavoriteMovies(localStorage.getItem('USER_ID'))
        .then(res => {

            setMovies(res.data);
            console.log(res.data);
            setFetching(false);
        })
        .catch(err => {
            console.log(err);
            //if(err.toString().includes("401"))  localStorage.clear();
            console.log("here is the status"+ err);
            history.push('/');
        });

     const clear=()=>{
                 setMovieID(null);
                 setMovieIsFavorite(false);
                 }

     const renderMovies = () => {

            if (fetching) { return  < Spin indicator = {antIcon} /> }

            if (movies.length <= 0) { return <Empty description={ <span> No favorite movies added to your list </span>} ></Empty>  }

             return<>
              <MovieDetailsDrawerForm
                  showDrawer={showDrawer}
                  setShowDrawer={setShowDrawer}
                  selectedMovieID={selectedMovieID}
                  selectedMovieIsFavorite={selectedMovieIsFavorite}
             />
             <Table
             dataSource = { movies }
             columns = { columns(fetchMovies) }
             bordered
             title = {() => 'My Favorite Movies' }
             pagination = {{ pageSize: 50 }}
             scroll = {{ y: 1000}}
             rowKey = { movie => movie.movieId }
             onRow = { (record) => ({
                     onClick: () => {
                         setMovieID(record.movieId);
                         setMovieIsFavorite(true);
                         setShowDrawer(!showDrawer);
                     },
                 })
             }
             />
             </>;


     }


    return <div> {renderMovies()} </div>

}

export default UserMovies;