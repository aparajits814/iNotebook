import React, { useState } from 'react'
import { Card } from 'antd'
import { Button, Modal } from 'antd';
import { Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
function Note(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const title = props.title;
    const desc = props.description;
    const [NoteTitle, setNoteTitle] = useState(title);
    const [NoteDesc, setNoteDesc] = useState(desc);
    const onFinish = (val) => {
        setNoteTitle(val.ntitle);
        setNoteDesc(val.ndesc);
        props.onUpdate(props.idx, val.ntitle, val.ndesc);
    }
    const onDel=()=>{
        props.onDelete(props.idx);
    }
    return (
        <div style={{ margin: "5px" }}>
            <Card title={NoteTitle} bordered={true} style={{ color: "white", backgroundColor: "black", width: '100%', height: '100%' }}>
                <div className='notedisplaydesc'>{NoteDesc}</div>
                <div style={{display:"flex"}}>
                    <div style={{margin:"2px"}}><Button style={{backgroundColor:"transparent"}} type="primary" onClick={showModal}><EditOutlined /></Button></div>
                    <div style={{margin:"2px"}}><Button style={{backgroundColor:"transparent"}}  type='primary' onClick={onDel}><DeleteOutlined /></Button></div>
                </div>
                <Modal title="Edit Your Note" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <Form layout='vertical' onFinish={onFinish}>
                        <Form.Item
                            label="New Title"
                            name="ntitle"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Title!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="New Description"
                            name="ndesc"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter Description!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </div>
    )
}

export default Note
