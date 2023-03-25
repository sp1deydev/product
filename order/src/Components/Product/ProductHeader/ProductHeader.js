import './ProductHeader.css';
import ProductList from "../ProductList/ProductList"
import ProductCategories from '../../../Constants/ProductCategories';
import { DownOutlined, FilterOutlined, UnorderedListOutlined, PictureOutlined } from '@ant-design/icons';
import { Input, Dropdown, Space, Button, Select } from 'antd';
import { useState } from 'react';

function ProductHeader(props) {
  const {Search} = Input;
  const [category, setCategory] = useState(undefined)

  const onSearch = (value) => console.log(value);

  const items = [...ProductCategories];
    
  //create list of categories
  const filterData = items.map(element => {
    return {value: element.label, label: element.label}
  });


  //on change categories
  const onChangeFilter = (value) => {

    //passing category to product component
    if(value !== undefined)
      props.getCategory(value)
    else
      props.getCategory("");
      
    setCategory(value);
  }


  // icon button 
  const iconBtns = {
    list: <UnorderedListOutlined />,
    filter: <FilterOutlined />,
    picture: <PictureOutlined />
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

      <Select
        value={category}
        style={{ width: 'fit-content', minWidth: '170px' }}
        allowClear
        placeholder= 'Danh mục thuốc'
        onChange={onChangeFilter}
        options={filterData}
      />
      <div className="group-btn">
        <Button type='ghost' shape='circle' icon={iconBtns.list}></Button>
        <Button type='ghost' shape='circle' icon={iconBtns.filter} className='btn'></Button>
        <Button type='ghost' shape='circle' icon={iconBtns.picture} className='btn'></Button>
      </div>
    </div>
  );
}

export default ProductHeader