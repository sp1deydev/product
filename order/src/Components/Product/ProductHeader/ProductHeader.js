import './ProductHeader.css'
import { DownOutlined, FilterOutlined, UnorderedListOutlined, PictureOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Dropdown, Space, Button } from 'antd';

function ProductHeader(props) {
    const {Search} = Input
    const onSearch = (value) => console.log(value);
    const handleMenuClick = (e) => {
        console.log('click', e);
      };

    const items = [
        {
          label: '1st menu item',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          label: '2nd menu item',
          key: '2',
          icon: <UserOutlined />,
        },
        {
          label: '3rd menu item',
          key: '3',
          icon: <UserOutlined />,
          danger: true,
        },
        {
          label: '4rd menu item',
          key: '4',
          icon: <UserOutlined />,
          danger: true,
          disabled: true,
        },
      ];
      
      const menuProps = {
        items,
        onClick: handleMenuClick,
      };

    // icon button 
    const iconBtns = {
      list: <UnorderedListOutlined />,
      filter: <FilterOutlined />,
      picture: <PictureOutlined />
    }



    //

    // CSS part
    const styles = {
        container: {
            backgroundColor: 'aquamarine',
            color: 'red',
        }
    }
    // ********************************
    return (
        <div className="container-product-header">
            <Search 
                placeholder="Tên khách hàng" 
                allowClear onSearch={onSearch}  
                enterButton 
                className="searchBtn"
            />

            <Dropdown menu={menuProps} >
            <Button>
                <Space>
                Bảng giá chung
                <DownOutlined />
                </Space>
            </Button>
            </Dropdown>
            <div className="group-btn">
                <Button type='ghost' shape='circle' icon={iconBtns.list}></Button>
                <Button type='ghost' shape='circle' icon={iconBtns.filter} className='btn'></Button>
                <Button type='ghost' shape='circle' icon={iconBtns.picture} className='btn'></Button>
            </div>
        </div>
    )
}

export default ProductHeader