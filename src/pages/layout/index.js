import { Layout, Menu, Popconfirm } from "antd"
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, clearUserInfo } from '@/store/modules/user'

const { Header, Sider } = Layout

const items = [
  {
    label: 'Home',
    key: '1',
    icon: <HomeOutlined />,
  },
  {
    label: 'Manage Articles',
    key: '2',
    icon: <DiffOutlined />,
  },
  {
    label: 'Create Articles',
    key: '3',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const onMenuClick = (route) => {
    console.log('menu is clicked', route)
    const path = route.key
    navigate(path)
  }

  // Get the current route path
  const location = useLocation()
  console.log(location.pathname)
  const selectedkey = location.pathname

  // Trigger personal user information action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  // Logout confirmation callback
  const onConfirm = () => {
    console.log('confirm to logout')
    dispatch(clearUserInfo())
    navigate('/login')
  }

  const name = useSelector(state => state.user.userInfo.name)
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="Are you sure you want to logout?" okText="logout" cancelText="cancell" onConfirm={onConfirm}>
              <LogoutOutlined /> logout
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedkey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* Exit of secondary route */}
          <Outlet /> 
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout