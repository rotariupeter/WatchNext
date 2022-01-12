import React, { useEffect } from 'react';
import { Modal, Button } from 'antd';
import '../css/AboutModal.css';
import {InfoCircleOutlined} from '@ant-design/icons';


function AboutModal({isAboutModalVisible,setIsAboutModalVisible}) {

    useEffect(() => {

                 console.log("hereeeeeee  "+ isAboutModalVisible)
              }, []);


    const showModal = () => { setIsAboutModalVisible(true) };
    const handleCancel = () => {setIsAboutModalVisible(false)};

return <Modal width = {600} title={<h2><InfoCircleOutlined /><span>&nbsp;About</span></h2>} visible={isAboutModalVisible} footer = {null} onCancel={handleCancel}>
           <h4>Watch Next app(Version 2.0)</h4>
            <table border = "0" width = "100%">
             <caption >Technologies used in this project&emsp;&emsp;&emsp;</caption>
             <h5>&nbsp;</h5>
                <tr>
                   <th>&emsp;&emsp;&emsp;Backend</th>
                   <th>Frontend</th>
                </tr>
                <tr><td>&emsp;&emsp;&emsp;- Spring Framework 5.3</td><td>- React 17.0.2</td></tr>
                <tr><td>&emsp;&emsp;&emsp;- Spring Boot Data JPA 2.5.0</td><td>- React-Axios 0.21.4</td></tr>
                <tr><td>&emsp;&emsp;&emsp;- Spring Security 2.5.0</td><td>- React-Redux 7.2.5</td></tr>
                <tr><td>&emsp;&emsp;&emsp;- JWT 0.9.1</td><td>- Ant Design 4.13.0 </td></tr>
                <tr><td>&emsp;&emsp;&emsp;- Postgresql JDBC 42.2.20</td><td></td></tr>
                 <h5>&nbsp;</h5>

                 <tr><th colSpan="2"> <center> Other Technologies&emsp;&emsp; </center></th></tr>
                 <tr><td colSpan="2"> <center>- Postgres DB on Docker Image&emsp;&emsp;</center></td></tr>
                 <tr><td colSpan="2"> <center>- AWS RDS & EC2 && Elastic Beanstalk&emsp;&emsp;</center></td></tr>
                 <tr><td colSpan="2"> <center>- Maven Build Tool&emsp;&emsp;</center></td></tr>
                 <tr><td colSpan="2"> <center>- Intellij Community Edition&emsp;&emsp;</center></td></tr>
                 <tr><td colSpan="2"> <center>- Git and Github&emsp;&emsp;</center></td></tr>
                 <h3>&nbsp;</h3>

             </table>
           <center>@Created by Rotariu Petru Constantin</center>
        </Modal>
}

export default AboutModal;
