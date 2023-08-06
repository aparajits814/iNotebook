import {  Menu, message } from 'antd';
import React, { useEffect } from 'react'
import { Link,  Outlet, useNavigate, } from 'react-router-dom';


import {
    HomeOutlined,
    FileAddOutlined,
    LogoutOutlined
} from '@ant-design/icons';

function Home() {
    const Navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('auth-token')){
            Navigate('/login')
        }
    })
    const [Notes,setNotes]=React.useState([]);
    const [title, setTitle] = React.useState("TITLE");
    const [description,setDescription]=React.useState("DESCRIPTION");


    const FetchData=async()=>{
        const token=localStorage.getItem('auth-token');
        const response=await fetch('http://localhost:5000/api/v1/fetchallnotes',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authtoken': token
            },
        });
        const r=await response.json();
        setNotes(r);

    }
    useEffect(() => {
        FetchData()
    }, [title,description]);
    const onclick = () => {
        Navigate('/login')
        localStorage.removeItem('auth-token');
    }
    const AddNote=async(val)=>{
        const token=localStorage.getItem('auth-token');
        setNotes(val.title);
        setDescription(val.description);
        const data={
            title:val.title,
            description:val.description
        }
        const JSONData=JSON.stringify(data);
        const response=await fetch('http://localhost:5000/api/v1/addnote',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authtoken': token
            },
            body:JSONData
        })
        const r=await response.json();
        message.success(r.msg);
    }
    const UpdateNote=async(val)=>{
        const token=localStorage.getItem('auth-token');
        setDescription(val.description);
        const data={
            title:val.title,
            description:val.description
        }
        const JSONData=JSON.stringify(data);
        const response=await fetch(`http://localhost:5000/api/v1/updatenote/${val.id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authtoken': token
            },
            body:JSONData
        })
        const r=await response.json();
        message.success(r.msg);
    }
    const DeleteNote=async(id)=>{
        const token=localStorage.getItem('auth-token');
        var tem=Notes.map((data)=>{
            return data._id
          })
          let index=tem.indexOf(id);
          Notes.splice(index,1);
        const response=await fetch(`http://localhost:5000/api/v1/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'authtoken': token
            },
        })
        setTitle(id);
        const r=await response.json();
        message.success(r.msg);
    }
    return (
        <>
            <div className='homeheader'>
                <h2>Welcome to iNotebook</h2>
            </div>
            <div>
                <div>
                    <Menu mode="horizontal" items={[
                        {
                            label: <Link to="/home/">View Notes</Link>,
                            icon: <HomeOutlined />
                        },
                        {
                            label: <Link to="/home/addnote">Add Note</Link>,
                            icon: <FileAddOutlined />
                        },
                        {
                            label: <button style={{backgroundColor:"transparent",border:"none", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"}} onClick={onclick}>Signout</button>,
                            icon: <LogoutOutlined />,
                        }
                    ]}>
                    </Menu>
                </div>
                <Outlet context={[title, setTitle,description,setDescription,AddNote,Notes,setNotes,UpdateNote,DeleteNote]} />
            </div>

            </>
       
    )
}

export default Home
