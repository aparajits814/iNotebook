import React, { useEffect } from 'react'
import { Button, Form, Input,message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
    const Navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('auth-token')){
            Navigate('/home/')
        }
    })
    const onFinish = async(val) => {
        const data=JSON.stringify(val);
        const response=await fetch("http://localhost:5000/api/v1/register",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:data
        })
        const r=await response.json();
        if(r.msgType==="success"){
            message.success(r.msg);
            Navigate('/login');
        }else{
            message.warning(r.msg);
        }
    }
    return (
        <>
            <h2>Welcome to iNotebook</h2>
            <div className='registerpage'>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[
                            {
                                required: false,
                                message: '',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password className='loginpass' />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Link to="/login" className='pageswitch'>Already a User? Login Now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Register
