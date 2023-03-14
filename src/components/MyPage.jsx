import React, { useEffect, useState } from 'react'
import { Row, Card, Col, Form, Button } from 'react-bootstrap'
import { app } from '../firebaseInit'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage'
import { async } from '@firebase/util'

const MyPage = () => {
    const [loading, setLoading] = useState(false)
    const db = getFirestore(app);
    const storage = getStorage(app);
    const [form, setForm] = useState({
        email:sessionStorage.getItem('email'),
        name:'무기명',
        address:'인천 서구 루원시티 포레나',
        photo:''
    });
    const {email, name, address, photo} = form;
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);
    const onChangeFile = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    const onChange = (e) => {
        setForm({...form, [e.target.name]:e.target.value});
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        if(!window.confirm('내용을 수정하시겠습니까?')) return;
        setLoading(true);
        //이미지업로드
        let url='';
        if(file !==null){ //파일이 존재하면 업로드
            const fileName=`images/${Date.now()}_${file.name}`;
            const result = await uploadBytes(ref(storage, fileName), file);
            url = await getDownloadURL(result.ref);
        }
        //정보수정
        await setDoc(doc(db, 'users', email), {...form, photo:url});
        setLoading(false);
    }
    const getInfo = async() => {
        setLoading(true);
        const result = await getDoc(doc(db, 'users', email));
        setForm(result.data());
        setImage(result.data().photo);
        setLoading(false);
    }

    useEffect(() => {
        getInfo();
    }, []);

    if(loading) return <h1 className='loading'>로딩중.....</h1>
    return (
        <Row className='m-5 justify-content-center'>
            <Col md={6}>
                <Card>
                    <Card.Title className='p-3 text-center'>
                        <h3>My Page</h3>
                    </Card.Title>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Control
                                name="name" value={name} onChange={onChange}
                                placeholder="이름" className='my-3'/>
                            <Form.Control
                                name="address" value={address} onChange={onChange}
                                placeholder="주소" className='my-3'/>
                            <img src={image ? image:"http://via.placeholder.com/100x120"} style={{width:'100px'}}/>
                            <Form.Control
                                onChange={onChangeFile}
                                type="file"
                                placeholder='photo' className='my-3'/>
                            <Button type="submit">정보수정</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default MyPage