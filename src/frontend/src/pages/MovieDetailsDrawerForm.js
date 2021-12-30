import {Drawer, Select, Button,Image,Typography,Timeline,Space,Tooltip,Rate,Popconfirm } from 'antd';
import { ClockCircleOutlined,PicRightOutlined,VideoCameraAddOutlined,GlobalOutlined, AppstoreAddOutlined ,TeamOutlined, NotificationOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons';
import {useState,useEffect} from 'react';

import {
    getMovieByID,
    updateUserMovies
}
from "../api/ClientService";
import '../css/MovieDetailsDrawerForm.css';
import {errorNotification, successNotification} from "./Notification";

const {Option} = Select;
const { Paragraph, Text } = Typography;

function MovieDetailsDrawerForm({showDrawer, setShowDrawer,selectedMovieID,selectedMovieIsFavorite}) {

    const onCLose = () => setShowDrawer(false);
    const[movieDetails, setMovieDetails] = useState([]);
    const [expandable, setExpandable] = useState(true);
    const [isFavorite, setFavorite] = useState();

    const toggle = () => setExpandable(p => !p);

    useEffect(() => {
                if(selectedMovieID)
                    fetchMovie(selectedMovieID)
                setFavorite(selectedMovieIsFavorite);
            },[selectedMovieID]);

//    const removeMovie = (MovieId, callback) => {xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//        deleteMovie(MovieId).then(() => {
//            successNotification( "Movie deleted", `Movie with ${MovieId} was deleted`);
//            callback();
//        });
//    }

    const HeartSvg = () => (
      <svg width="25px" height="25px" fill="currentColor" viewBox="0 0 1024 1024">
        <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
      </svg>
    );

    const HeartIcon = props => <Icon component={HeartSvg} {...props} />

    const onFinish = values => {
        alert(JSON.stringify(values, null, 2));
    };

    const onFavorite = value => {
           if(value){
             updateUserMovies(localStorage.getItem('USER_ID'),selectedMovieID,"add")
           }
           else {
             updateUserMovies(localStorage.getItem('USER_ID'),selectedMovieID,"remove")
           }
           setFavorite(value)

        };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

      const fetchMovie = (id) =>{
        getMovieByID(id)
        .then(res => {
            console.log(res.data);
            console.log(res.data.country);
            setMovieDetails(res.data);
           // setFetching(false);
        })
        .catch(err => {
            console.log(err);
        });
        }

    return <Drawer
        //title=""
        width={800}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{padding: 0}}
        style={{  }}

        footer={
         <div className="footer">

            {localStorage.getItem('NAME') != null && localStorage.getItem('USER_KEY') != null ?
                isFavorite ?
                 <Popconfirm
                   placement='topLeft'
                   title={`Are you sure you want to remove this movie from your Watchlist?`}
                   onConfirm={() => onFavorite(false)}
                   okText='Yes'
                   cancelText='No'>
                    <Tooltip placement="rightTop" title="Added to Favorite" color='red' key='black'>
                       <HeartIcon style={{ color: 'red', align:'right',float: 'left', padding: 0}} />
                    </Tooltip>
                 </Popconfirm>
                    :
                  <Popconfirm
                    placement='topLeft'
                    title={`Please confirm you want to add this movie to your Watchlist`}
                    onConfirm={() => onFavorite(true)}
                    okText='Confirm'
                    cancelText='Cancel'>
                    <Tooltip placement="rightTop" title="Add to Favorite" color='red' key='black'>
                        <HeartIcon  style={{ color: 'gray', align:'right',float: 'left', padding: 0}} />
                    </Tooltip>
                  </Popconfirm>

            :
            null
            }

             <span className = "vertical-center"> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <Tooltip title="Rate" color='red' key='black'>
                    <Rate tooltips ={["Rate 1 Star","Rate 2 Stars","Rate 3 Stars","Rate 4 Stars","Rate 5 Stars"]}  allowHalf defaultValue={3.5} style={{ align:'center',float: 'center'}}/>
                </Tooltip>
             </span>
            <Button style={{ align:'right',float: 'right',  padding: '3px'}} onClick={onCLose} >
                 Cancel
             </Button>
        </div>

        }
    >

    <div style={{} }>
     <Image
         width={800}
         padding={0}
         style={{ width: '100%', height: '330px', ['object-fit']: 'cover'}}
         src="/upload/images/first.png"
     />
     </div>

     <div  style={{ ['padding-left']: '15px'} }>

      <Timeline style={{ padding: '15px' }}>

         <Timeline.Item dot={<VideoCameraAddOutlined className="timeline-clock-icon" />} color="black">
           <div  style={{ ['padding-left']: '10px' }}>
             <p style={{ ['font-size']: '19px'}}><b> {"Name: "+ movieDetails.movieName}</b></p>
           </div>
         </Timeline.Item>

         <Timeline.Item dot={<AppstoreAddOutlined className="timeline-clock-icon" />} color="red">
           <div  style={{ ['padding-left']: '10px' }}>
             <p style={{ ['font-size']: '19px'}}><b> Genre(s):</b> Drama , Action </p>
           </div>
         </Timeline.Item>

        <Timeline.Item dot={<PicRightOutlined className="timeline-clock-icon" />} color="blue">
          <div  style={{ ['padding-left']: '10px' }}>
            <p style={{ ['font-size']: '19px' }}><b>Description:</b></p>
            <Paragraph ellipsis={expandable ?{ rows: 1, expandable:expandable, symbol: ' ' }:false}>
             &nbsp; {movieDetails.movieDescription}
            </Paragraph>
            {expandable ?
             <Text code onClick={toggle}> Expand </Text>
             :<Text code onClick={toggle}> Collapse </Text>
            }

           </div>
        </Timeline.Item>


          <Timeline.Item dot={<GlobalOutlined className="timeline-clock-icon" />} color="green">
          <div  style={{ ['padding-left']: '10px' }}>
            <p style={{ ['font-size']: '19px'}}><b> {"Country: "+ movieDetails.country}</b></p>
          </div>
          </Timeline.Item>

         <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red">
           <div  style={{ ['padding-left']: '10px' }}>
              <p style={{ ['font-size']: '19px'}}><b> {"Duration: "+ movieDetails.durationInMin + "(mins)"}</b></p>
           </div>
         </Timeline.Item>

          <Timeline.Item dot={<NotificationOutlined className="timeline-clock-icon"  />} color="blue">
             <div  style={{ ['padding-left']: '10px' }}>
               <p style={{ ['font-size']: '19px'}}><b>Director: </b> Sam Mendes</p>
             </div>
          </Timeline.Item>
          <Timeline.Item dot={<TeamOutlined className="timeline-clock-icon"  />} color="black">
           <div  style={{ ['padding-left']: '10px' }}>
                <p style={{ ['font-size']: '19px'}}><b> Stars: </b> Daniel Craig - Javier Bardem - Naomie Harris</p>
           </div>
          </Timeline.Item>

       </Timeline>

       </div>

    </Drawer>
}

export default MovieDetailsDrawerForm;