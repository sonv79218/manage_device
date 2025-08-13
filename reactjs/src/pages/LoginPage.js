import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Container from '../components/layout/Container';
import Form from '../components/form/Form';
// import LoadingSpinner from '../components/common/LoadingSpinner';
import api from '../config/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  // có email, pass, là thay đổi 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // hiển thị lỗi - ban đầu lỗi = rỗng 
  const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);


  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // console.log('Gửi login với:', { email, password });
      const response = await api.post('/auth/login', { email, password }); // lấy user name và pass từ api
      // console.log('✅ Dữ liệu nhận được từ API:', response.data); // ✅ In ra dữ liệu nhận được
      const { access_token: token,user } = response.data;
      
      login(token,user);
      // thông báo đăng nhập thành công
    toast.success('Đăng nhập thành công!',{position: "top-center",autoClose: 1000,
      onClose:()=>{
              if (user.role === 'admin') {
        navigate('/admin'); // nếu mà là admin thì sang trang admin
      } else {
        navigate('/user'); // nếu là user thì sang trang user
      }
      }});
      
    } 
    catch (err) {
      const message = 'Đăng nhập thất bại. Vui lòng thử lại.';
      setError(message);

      toast.error(message, {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };
// các field
  const fields = [
    { label: 'Tên đăng nhập', type: 'text', value: email, onChange: (e) => setEmail(e.target.value), placeholder: 'Nhập tên đăng nhập' },
    { label: 'Mật khẩu', type: 'password', value: password, onChange: (e) => setPassword(e.target.value), placeholder: 'Nhập mật khẩu' },
  ];

  return (
    <Container>
      {/* {loading && <LoadingSpinner />} */}
      {/*  truyền vào form  */}
      <Form
        title="Đăng nhập"
        fields={fields}
        onSubmit={handleLogin} 
        error={error}
        buttonText="Đăng nhập"
      />
       <ToastContainer position="top-center"/>
    </Container>
  );
};

export default LoginPage;