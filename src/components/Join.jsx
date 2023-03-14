import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const Join = ({history}) => {
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [form, setForm] = useState({
        email: 'user01@email.com',
        password: '12341234'
    })
    const {email, password} = form;
    const onChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(!window.confirm("회원가입 하시겠습니까?")) return;
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((success) => {
            //유저정보저장
            setDoc(doc(db, 'users', email), {
                email:email,
                name:'',
                address:'',
                photo:''
            });
            setLoading(false);
            alert("회원가입 성공!");
            history.push('/login');
        })
        .catch((error) => {
            setLoading(false);
            alert("회원가입 실패!" + error.message);
        })
    }

    if(loading) return <h1 className='loading'>loading</h1>
    return (
        <Row className='my-5 justify-content-center'>
            <Col md={4}>
                <Card>
                    <Card.Title className='p-3 text-center'>
                        <h3>Rigister</h3>
                    </Card.Title>
                    <Card.Body>
                        <Form className='mb-2' onSubmit={onSubmit}>
                            <Form.Control placeholder='Email' className='mb-3' name="email" onChange={onChange} value={email}/>
                            <Form.Control placeholder='Password' className='mb-3' type="password" name="password" onChange={onChange} value={password}/>
                            <Button type="submit" style={{width:'100%'}}>회원가입</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Join