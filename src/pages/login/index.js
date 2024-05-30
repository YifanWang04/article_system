import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Retrieve form data
  const onFinish = async (values) => {
    console.log(values);
    // Dispatch asynchronous action fetchLogin
    await dispatch(fetchLogin(values))
    // to home page
    navigate('/')
    message.success('login successful')
  }
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt="" />
        {/* Login Form */}
        <Form onFinish={onFinish} validateTrigger="onBlur">
          <Form.Item
            name="mobile"
            // Multiple check logic
            rules={[
              {
                required: true,
                message: 'Please input your phone number',
              },
              {
                message: 'please input the correct format'
              }
            ]}>
            <Input size='large' placeholder='please enter phone number' />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input your vertification code',
              },
            ]}>
            <Input size='large' placeholder='please enter verification code' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' block>
              log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login