import React from 'react'
import { Col, Row } from 'antd';
import Note from './Note';
import { useOutletContext } from "react-router-dom"
function Temp() {
  const options = useOutletContext();
  const Notes = options[5];

  const onUpdate = (id, NoteTitle, NoteDesc) => {
    const val = {
      id: id,
      title: NoteTitle,
      description: NoteDesc
    }
    options[7](val);
  }
  const onDelete=(id)=>{
    options[8](id);
  }
  return (
    <>
      <div style={{ height: "100vh" }}>
        <Row className='rowdesign'>
          {
            Notes.length===0 ? <h4 className='noNotes'>No Notes to Show</h4> : Notes.map((data) => {
              return (
                <Col key={data._id} xs={24} sm={24} md={8} xl={4}><Note key={data._id} title={data.title} description={data.description} onUpdate={onUpdate} idx={data._id} onDelete={onDelete}></Note></Col>
              )
            })
          }

        </Row>
      </div>
    </>
  )
}

export default Temp
