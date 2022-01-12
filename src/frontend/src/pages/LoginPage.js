import react,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import { Form, Input, Button,Spin,Space } from 'antd';
import { UserOutlined,LockFilled,SyncOutlined } from '@ant-design/icons';
import '../css/loginpage.css';
import {userLogin} from '../api/authenticationService';
import CreationUserDrawerForm from './CreationUserDrawerForm';
import {Alert,Spinner} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const LoginPage=({setBodyDisplayed,error,...props})=>{

    let history = useHistory();
    const [values, setValues] = useState({
        userName: '',
        password: ''
        });

    const [fetching, setFetching] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

     useEffect(() => {
                 //if(!showDrawer){
              console.log("show drawer state:"+ showDrawer)
              if(showDrawer == false)
                error = '';

          }, [showDrawer]);


    const antIcon = <SyncOutlined style={{ fontSize: 24 }} spin />;
    const space = <Space size="middle"> <a>Invite {}</a> </Space>

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();
        setFetching(true);
        userLogin(values).then((response)=>{
            setFetching(false);
            console.log("response",response);
            if(response.status===200){
                props.setUser(response.data);
                setBodyDisplayed("dashboard")
                history.push('/dashboard');
            }
            else{
               props.loginFailure('Something Wrong!Please Try Again!');
            }


        }).catch((err)=>{
            setFetching(false);
            console.log("aiciaaa "+ err.response+ " " +err)
            if(err && err.response){

            switch(err.response.status){
                case 401:
                    console.log("401 status");
                    props.loginFailure("Auth. Failed: Bad Credentials!");
                    break;
                default:
                    props.loginFailure('Something Wrong! Please Try Again!');

            }

            }
            else{
                props.loginFailure('Something Wrong!Please Try Again!');
            }




        });
        //console.log("Loading again",loading);


    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
        ...values,
        [e.target.name]: e.target.value
        }));
    };

    //console.log("Loading ",loading);

    return (<>
        <CreationUserDrawerForm
              showDrawer={showDrawer}
              setShowDrawer={setShowDrawer}
        />

        <div className="login-page">

                    <div className="card fat">
                        <div className="card-body">

                             <h1>&nbsp;</h1>
                             <h1>&nbsp;</h1>
                             <div className="card-title" style={{ textAlign: 'left',['font-size']: '30px'}} ><b>Login</b></div>
                             <h1>&nbsp;</h1>
                             <h1>&nbsp;</h1>

                            <form className="my-login-validation" onSubmit={handleSubmit} noValidate={false}>
                                <div className="form-group">


                                    <Input size="large" placeholder="Your Username or Email" prefix={<UserOutlined style={{ ['font-size']: '25px'}} />} id="username" type="text" className="form-control" minLength={5} value={values.userName} onChange={handleChange} name="userName" required />

                                </div>
                                <div>&nbsp;</div>
                                <div className="form-group">

                                    <Input.Password prefix={<LockFilled style={{ ['font-size']: '25px'}} />} size="large" placeholder="Your Password" id="password" type="password" className="form-control" minLength={5} value={values.password} onChange={handleChange} name="password" required />
                                    <div className="invalid-feedback">
                                        &nbsp;
                                    </div>
                                </div>

                                <div className="form-group">


                                </div>
                                <div>
                                <Button titlealign="center" type="primary" htmlType="submit" size="large" className="loginScreenButton" style={{['background-color']: '#7e39b3', border:'none', float: 'right'}}>
                                Login&nbsp;{fetching ?  < Spin indicator = {antIcon} style={{color: 'white'}} /> : null }
                                </Button>

                                </div>
                            </form>
                            { error  &&
                            <><div>&nbsp;</div><Space >{error} <a onClick = {() => setShowDrawer(!showDrawer)} >Sign Up! </a> </Space></>
                            }

                            <h1>&nbsp;</h1>
                            <h1>&nbsp;</h1>
                            <h1>&nbsp;</h1>
                            <h1>&nbsp;</h1>
                            <h1>&nbsp;</h1>
                            <h1>&nbsp;</h1>
                            <h1>&nbsp;</h1>

                        </div>
                    </div>
        </div>
    </>)



}

const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        //loading:auth.loading,
        error:auth.error
}}


const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);