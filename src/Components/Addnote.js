import React from 'react'
import { Button, Form, Input } from 'antd';
import { useOutletContext } from 'react-router-dom';
const { TextArea } = Input;
function Addnote() {
    const [title, setTitle,description,setDescription,AddNote,Notes,setNotes,UpdateNote]=useOutletContext();
    const onFinish=(val)=>{
        AddNote(val);
    }

    
    return (
        <div style={{ height: "100vh" }}>
            <div className='addnote'>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item
                    label="title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please add a title!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter some Description!',
                        },
                    ]}
                >
                    <TextArea rows={10} className='desc'/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Note!
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    )
}

export default Addnote
