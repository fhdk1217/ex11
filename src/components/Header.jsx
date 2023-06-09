import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import back from '../images/back.jpg'

function ColorSchemesExample({history}) {
    let email=sessionStorage.getItem('email');

    const onLogout = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('email');
        history.push('/');

    }
    return (
        <>
            <img src={back} style={{width:'100%'}}/>
            <Navbar bg="primary" variant="dark" className='header'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/users">회원목록</NavLink>
                {email ?
                <NavLink to="/logout" onClick={onLogout}>로그아웃</NavLink>
                :
                <NavLink to="/login">로그인</NavLink>
                }
                {email && <NavLink to="/mypage">{email}</NavLink>}
            </Navbar>
        </>
    );
}

export default withRouter(ColorSchemesExample);