import React, { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'react-router-dom'

const Login = ({history}) => {
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
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
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((success) => {
            alert("로그인 성공!");
            sessionStorage.setItem('email', email);
            setLoading(false);
            history.push('/');
        })
        .catch((error) => {
            setLoading(false);
            alert("로그인 실패!" + error.message);
        })
    }
    if(loading) return <h1 className='loading'>loading</h1>
    return (
        <Row className='my-5 justify-content-center'>
            <Col md={4}>
                <Card>
                    <Card.Title className='p-3 text-center'>
                        <h3>Login</h3>
                    </Card.Title>
                    <Card.Body>
                        <Form className='mb-2' onSubmit={onSubmit}>
                            <Form.Control placeholder='Email' className='mb-3' name="email" onChange={onChange} value={email}/>
                            <Form.Control placeholder='Password' className='mb-3' type="password" name="password" onChange={onChange} value={password}/>
                            <Button type="submit" style={{width:'100%'}}>로그인</Button>
                            <Link to="/join">회원가입</Link>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Login