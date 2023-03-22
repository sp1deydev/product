import './ProductHeader.css';
import ProductList from "../ProductList/ProductList"
import ProductCategories from '../../../Constants/ProductCategories';
import { DownOutlined, FilterOutlined, UnorderedListOutlined, PictureOutlined } from '@ant-design/icons';
import { Input, Dropdown, Space, Button } from 'antd';

function ProductHeader(props) {
  const {Search} = Input;
  const onSearch = (value) => console.log(value);
  const handleMenuClick = (e) => {
    <ProductList category={e.key}/>
  };

  const items = [...ProductCategories];
      
  const menuProps = {
    items: items,
    onClick: handleMenuClick,
  };

  // icon button 
  const iconBtns = {
    list: <UnorderedListOutlined />,
    filter: <FilterOutlined />,
    picture: <PictureOutlined />
  };

  // CSS part
  const styles = {
    container: {
      backgroundColor: 'aquamarine',
      color: 'red',
    }
  };

  // ********************************
  return (
    <div className="container-product-header">
      <Search 
        placeholder="Tên khách hàng" 
        allowClear 
        onSearch={onSearch}  
        enterButton 
        className="searchBtn"
      />

      <Dropdown menu={menuProps} >
        <Button>
          <Space>
            Danh mục thuốc
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
  );
}

export default ProductHeader