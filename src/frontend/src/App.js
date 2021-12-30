import {
    useState,
    useEffect
}
from 'react'
import {
    getAllMovies
}
from "./api/ClientService";
import {successNotification, warningNotification} from "./pages/Notification";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Icon from '@ant-design/icons';

import {
    BrowserRouter,
    Switch,
    Route,
    withRouter
}
from "react-router-dom";
import LoginPage from './pages/LoginPage';
import AboutModal from './pages/AboutModal';
import UserMovies from './pages/dashboard/UserMovies';
import MovieDetailsDrawerForm from './pages/MovieDetailsDrawerForm';
import {
    Layout,
    Menu,
    Breadcrumb,
    Table,
    Spin,
    Empty
}
from 'antd';
import {
    TeamOutlined,
    HomeOutlined,
    UserOutlined,
    LoadingOutlined,
    InfoCircleOutlined
}
from '@ant-design/icons';

import './App.css';

const {
    Header,
    Content,
    Footer,
    Sider
} = Layout;

const { SubMenu } = Menu;

const HeartSvg = () => (
          <svg width="25px" height="25px" fill="currentColor" viewBox="0 0 1024 1024">
            <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
          </svg>
        );

const HeartIcon = props => <Icon component={HeartSvg} {...props} />

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
        },{
            title: '',
            dataIndex: 'userID',
            key: 'userID',
            width: true ? 55 : 0.1,
            render: (record) => <div> {record ? <HeartIcon style={{ color: 'red', align:'right',float: 'left', padding: 0}} />:null}</div>
          },
    ];

const generalColumns = fetchMovies => [ {
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



const antIcon =  < LoadingOutlined style = {{ fontSize: 24}}
spin /  > ;


function App() {

    const[movies, setMovies] = useState([]);
    const[collapsed, setCollapsed] = useState(false);
    const[fetching, setFetching] = useState(true);
    const[bodyDisplayed, setBodyDisplayed] = useState([]);
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[userInitials, setUserInitials] = useState([]);
    const[selectedMovieID, setMovieID] = useState([]);
    const[selectedMovieIsFavorite, setMovieIsFavorite] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);
    const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);


    let history = useHistory();

    useEffect(() => {
              toHome();
     },[]);

     useEffect(() => {
            clear();
            if(bodyDisplayed == null || bodyDisplayed.length ===""){
                routeChange("home");
            }
            console.log("component is mounted " + "Bearer " + localStorage.getItem('NAME'));
            updateLoginStatus();
            console.log(isLoggedIn);
            if("home" === bodyDisplayed)
                fetchMovies();
            getInitial(localStorage.getItem('NAME'));
        }, [bodyDisplayed]/*,isLoggedIn*/);



     useEffect(() => {
           if(!showDrawer){
                fetchMovies();
          }
         },[showDrawer]);

     useEffect(() => {
         //console.log("MovieID: "+selectedMovieID);

     },[selectedMovieID,selectedMovieIsFavorite]);

    //
    axios.interceptors.request.use(function (config) {
        if(localStorage && localStorage.getItem("EXPIRATION_DATE") && Date.parse(localStorage.getItem("EXPIRATION_DATE")) >= new Date()){

            const token = "Bearer " + localStorage.getItem("USER_KEY");
            config.headers.Authorization = token;
        } else {
            if(localStorage.getItem("NAME")){
                warningNotification(
                 "Session expired!",
                 `Please login again with user: ${localStorage.getItem("NAME")}`
                )
            }

            localStorage.clear();
        }
        return config;
    });

    const logOut=()=>{
        routeChange("logout")
        localStorage.clear();
        history.push('/');

    }

     const clear=()=>{
           setMovieID(null);
           setMovieIsFavorite(false);
        }

    const loggedIntoDashboard=()=>{
            routeChange("dashboard")
            console.log("helllllow dash");
            history.push('/dashboard');

        }

    const  toHome=()=>{
            if("home" === bodyDisplayed)// work around - this is called only if we press again home button
              fetchMovies();

            routeChange("home")
            console.log("helllllow home");
            history.push('/');

                }
     const  toLogin=()=>{
                routeChange("login")
                console.log("helllllow login");
                history.push('/login');

                    }

    const fetchMovies = () =>
    getAllMovies(localStorage.getItem('USER_ID'))
    .then(res => {
        setMovies(res.data);
        console.log("from app");
        setFetching(false);
    })
    .catch(err => {
        console.log(err);
    });

    function getInitial(name) {

       var result = "User"

       if(name != null){

        let initials = name.split(' ');

        if (initials.length > 1) {
            initials = initials.shift().charAt(0) + initials.pop().charAt(0);
        } else {
            initials = name.substring(0, 2);
        }
        if (initials != null)
            result += " - " + initials.toUpperCase();

        }

        setUserInitials(result);

    }


    const routeChange = (str) => {

         console.log("is rout changed to " + str)
        setBodyDisplayed(str)

    }

    const updateLoginStatus = () => {

    if (localStorage.getItem('NAME') != null && localStorage.getItem('USER_KEY') != null)
      setIsLoggedIn(true);
    else
      setIsLoggedIn(false);
    }


    const renderMovies = () => {
        if (fetching) { return  < Spin indicator = {antIcon} /> }

        if (movies.length <= 0) { return <Empty / >  }

        return<>
        <MovieDetailsDrawerForm
             showDrawer={showDrawer}
             setShowDrawer={setShowDrawer}
             selectedMovieID={selectedMovieID}
             selectedMovieIsFavorite={selectedMovieIsFavorite}
        />
        <AboutModal
             isAboutModalVisible={isAboutModalVisible}
             setIsAboutModalVisible={setIsAboutModalVisible}
        />
        <Table
        dataSource = { movies }
        columns = { localStorage.getItem('NAME') != null && localStorage.getItem('USER_KEY') != null ? columns(fetchMovies) : generalColumns(fetchMovies) }
        bordered
        title = {() => 'Latest Movies' }
        pagination = {{ pageSize: 50 }}
        scroll = {{ y: 1000}}
        rowKey = { movie => movie.movieId }
        onRow = { (record) => ({
                onClick: () => {
                    setMovieID(record.movieId);
                    setMovieIsFavorite(record.userID > 0);
                    setShowDrawer(!showDrawer);
                },
            })
        }
        />
        </>

    }
    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                  <div className="logo" > aici este logo</div>
                  <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={() => toHome()} /*autoFocus={bodyDisplayed === "logout" }*/ icon={<HomeOutlined />}>
                      Home
                    </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title={localStorage.getItem('NAME') != null && localStorage.getItem('USER_KEY') != null ? userInitials : "User"}  >
                        {localStorage.getItem('NAME') != null && localStorage.getItem('USER_KEY') != null ?
                            <Menu.Item key="3">{localStorage.getItem('NAME')}</Menu.Item>
                             : null}
                        {localStorage.getItem('NAME') != null && localStorage.getItem('USER_KEY') != null ?
                             null
                             : <Menu.Item key="5" className="customclass" onClick={() => toLogin()} >Login</Menu.Item>}

                        {localStorage.getItem('NAME') != null && localStorage.getItem('USER_KEY') != null ?
                        <>
                            <Menu.Item key="5" onClick={() => loggedIntoDashboard()}>My movies</Menu.Item>
                            <Menu.Item key="1" className="customclass" onClick={() => logOut()}>Logout</Menu.Item>
                        </>
                        : null}
                    </SubMenu>
                    <Menu.Item key="7" onClick={() => setIsAboutModalVisible(!isAboutModalVisible)} /*autoFocus={bodyDisplayed === "logout" }*/ icon={<InfoCircleOutlined  />}>
                       About
                     </Menu.Item>

                  </Menu>
                </Sider>
                <Layout className="site-layout">
                  <Header className="site-layout-background" style={{ padding: 0 }} />
                  <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>Welcome</Breadcrumb.Item>
                      <Breadcrumb.Item>{localStorage.getItem('NAME')}</Breadcrumb.Item>
                    </Breadcrumb>
                     <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                         {//bodyDisplayed === "login" ? "hei der" : renderMovies()
                         }
                          <Switch>
                              <Route exact path="/" component={ () => renderMovies()}/>
                              <Route exact path="/login" component= { () => < LoginPage bodyDisplayed = {bodyDisplayed} setBodyDisplayed = {setBodyDisplayed}/> }/>
                              <Route exact path="/dashboard" component= { () => < UserMovies setBodyDisplayed = {setBodyDisplayed} /> }/>
                          </Switch>
                     </div>
                  </Content>
            <Footer style={{textAlign: 'center'}}>@Copyright 2021 Petru Rotariu</Footer>
        </Layout>
    </Layout>
}

export default withRouter(App);
