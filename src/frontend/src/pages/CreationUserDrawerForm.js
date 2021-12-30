import {Drawer, Input, Col, Select, Form, Row, Button, Cascader,Checkbox} from 'antd';
import react,{useState,useEffect} from 'react';
import 'antd/dist/antd.css';
import '../css/CreationUserDrawerForm.css';
import {saveUser} from '../api/ClientService';
import {successNotification, errorNotification} from "./Notification";

const {Option} = Select;

function CreationUserDrawerForm({showDrawer, setShowDrawer}) {
    const onCLose = () => setShowDrawer(false);
    const onFinish = value => {
        //alert(JSON.stringify(value, null, 2));

        saveUser(value).then((response)=>{

            if(response.status===201){
               console.log('user creation success: ', value);
               onCLose();

               successNotification(
                "User successfully added",
                `Username ${value.userName} was added to the system`
               )
             }
             else{
             console.log('user creation success: ', response.status);
             }

        }).catch((err)=>{
           if(err && err.response){
             console.log('user creation err: ', err.response);
             errorNotification(
                "User failed to add",
                `Change Username or Email. These fields are already in the system`
                 )
           }
           else{
                 console.log('user creation err else');
           }
         });
    };

    const [form] = Form.useForm();

    const onFinishFailed = errorInfo => {
        //alert(JSON.stringify(errorInfo, null, 2));
    };
     useEffect(() => {
          if(showDrawer){
              console.log("hi there");
              form.resetFields();
          }
     }, [showDrawer]);

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const prefixSelector = (
        <Form.Item name="countryPrefix" noStyle>
          <Select
          style={{
           width: 70,
          }}
        >
         <Option value="40">+40</Option>
         <Option value="39">+39</Option>
         </Select>
        </Form.Item>
    );
    const RegistrationForm = () => {

      const onFinish = (values) => {
      console.log('Received values of form: ', values);
      };
     };

    return <Drawer
        title="Create new User"
        width={700}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 60}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                countryPrefix: '40',
              }}
              scrollToFirstError
            >
               <Form.Item
                    name="userName"
                    label="Username"
                    tooltip="Not allow duplicate "
                    rules={[{
                        required: true,
                        message: 'Please input your Username',
                        whitespace: false,

                      },
                      () => ({
                          validator(_, value) {
                            if (value && !value.match("^[0-9a-zA-Z]+$")) {
                              return Promise.reject(new Error('Username must contains only letters and digits'));
                            }
                            else if (value && value.length < 5) {
                              return Promise.reject(new Error('Username must contains at least 5 chars'));
                            }
                            return Promise.resolve();

                          },
                        }),]}
                  >
                    <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    min: 5,
                    message: 'Password must contains at least 5 chars',
                    },
                ]}
                hasFeedback
              >
                <Input.Password autoComplete='off' />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

               <Form.Item
                    name="surname"
                    label="Surname"
                    rules={[{
                        required: true,
                        message: 'Please input your Surname!',
                        whitespace: false,

                      },
                      () => ({
                          validator(_, value) {
                            if (value && value.length < 2) {
                              return Promise.reject(new Error('Surname must contains at least 2 chars'));
                            }
                            return Promise.resolve();

                          },
                        }),]}
                  >
                    <Input />
              </Form.Item>

               <Form.Item
                     name="forename"
                     label="Forename"
                     rules={[{
                         required: true,
                         message: 'Please input your Forename!',
                         whitespace: false,

                       },
                       () => ({
                           validator(_, value) {
                             if (value && value.length < 2) {
                               return Promise.reject(new Error('Forename must contains at least 2 chars'));
                             }
                             return Promise.resolve();

                           },
                         }),]}
                   >
                     <Input />
               </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                     },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                     },
                    ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                  name="role"
                  label="Role"
                  rules={[
                    {
                       required: true,
                       message: 'Please input your Role!',

                    },
                    () => ({
                       validator(_, value) {
                         if (value && value != 'user') {
                           return Promise.reject(new Error('You do not have permission to create '+value+' role!'));
                         }
                         return Promise.resolve();

                       },
                     }),
                  ]}
                >
                  <Select placeholder="select your role">
                    <Option value="user">User Role</Option>
                    <Option value="moderator">Moderator Role</Option>
                    <Option value="admin">Administrator Role</Option>
                  </Select>
              </Form.Item>

              <Form.Item
                  name="gender"
                  label="&nbsp;&nbsp;&nbsp;Gender"
                  rules={[
                    {
                      required: false,

                    },
                  ]}
                >
                  <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
              </Form.Item>

              <Form.Item
                name="phone"
                label="&nbsp;&nbsp;&nbsp;Phone Number"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>

              <Form.Item
                name="intro"
                label="&nbsp;&nbsp;&nbsp;Intro"
                rules={[
                  {
                    required: false,

                  },
                ]}
              >
                <Input.TextArea showCount maxLength={1000} />
              </Form.Item>



              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Please read and accept agreement')),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
    </Drawer>
}

export default CreationUserDrawerForm;