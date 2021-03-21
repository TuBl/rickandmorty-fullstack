import { Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function NavBar() {
  const [current, setcurrent] = useState('home');

  const handleClick = (e) => {
    console.log('click', e);
    setcurrent({current: e.key});
  }
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
    <Menu.Item key="home" icon={<HomeOutlined />}>
      <Link to="/">Charecters List</Link>
    </Menu.Item>
  </Menu>
  )
}

export default NavBar