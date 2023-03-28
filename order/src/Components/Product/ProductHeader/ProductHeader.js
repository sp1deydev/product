import './ProductHeader.css';
import ProductList from "../ProductList/ProductList"
import Customers from '../../../Constants/Customers';
import ProductCategories from '../../../Constants/ProductCategories';
import Key from '../../../Constants/GetAuthKey';
import { DownOutlined, FilterOutlined, UnorderedListOutlined, PictureOutlined, UserAddOutlined } from '@ant-design/icons';
import { Input, Button, Select, Modal, DatePicker, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';


function ProductHeader(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [category, setCategory] = useState(undefined)
  const items = [...ProductCategories];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listCustomers, setListCustomers] = useState([])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  
  // icon button 
  const iconBtns = {
    list: <UnorderedListOutlined />,
    filter: <FilterOutlined />,
    picture: <PictureOutlined />
  };

  useEffect(() => {
    let data = Customers.map(element => {
      return {value: element.account_id, label: element.label}
    });
    setListCustomers(data)
  }, [Customers])

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


  const onChangeCustomer = (value) => {
    console.log("onChangeCustomer", value);
  }

const onFinish = (values) => {
    console.log('Success:', values);
    let newCustomer = {
          firstname : values.firstname ? values.firstname : "",
          lastname : values.lastname ? values.lastname: "",
          phone : values.phone ?  values.phone : "",
          email : values.email ? values.email : "",
          mailingstreet : values.mailingstreet ? values.mailingstreet : "",
          birthday : values.birthday ? values.birthday : ""
    }
    //form.resetFields()
    //Post api
    axios.post(`${process.env.REACT_APP_API_URL}/modules/RestfulApi/Contacts/${Key}`, new URLSearchParams(newCustomer))
      .then(res => {
        messageApi.open({
          type: 'success',
          content: 'Thêm khách hàng thành công',
        });
        console.log(res);
      })
      .catch(err => {
        messageApi.open({
          type: 'error',
          content: 'Lỗi khi thêm khách hàng, ' + err.message,
        });
        console.log(err);
      })
  }
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // ********************************
  return (
    <div className="container-product-header">
      {contextHolder} 

      <Select
        showSearch
        allowClear
        listHeight={160}
        placeholder="Tên khách hàng"
        optionFilterProp="children"
        style={{ minWidth: '170px', marginRight: '4px' }}
        onChange={onChangeCustomer}
        // onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={listCustomers}
        />

      <Button icon={<UserAddOutlined />} style={{ marginRight: '4px' }} onClick={showModal}/>
      <Modal title="Thêm khách hàng" 
        style={{ top: 40 }}
        open={isModalOpen} 
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
           <Form.Item
              label="Họ"
              name="firstname"
            >
              <Input placeholder='Nhập họ'/>
            </Form.Item>

            <Form.Item
              label="Tên"
              name="lastname"
              rules={[{ required: true, message: 'Tên khách hàng là bắt buộc!' }]}
              >
              <Input placeholder='Nhập tên'/>
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              >
              <Input 
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                    }
                  }} 
                  placeholder="Nhập số điện thoại"/>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: 'email', message: 'Email không hợp lệ' }]}
              >
              <Input placeholder='Nhập email'/>
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="mailingstreet"
            >
              <Input placeholder='Nhập địa chỉ'/>
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
              getValueFromEvent={(onChange) => moment(onChange).format('YYYY-MM-DD')}
              getValueProps={(i) => moment(i)}
            >
              <DatePicker format="YYYY-MM-DD"  style={{ width: '100%' }} placeholder="Ngày sinh"/>
            </Form.Item>
            
            <Form.Item style={{textAlign: 'center'}}>
              <Button type="primary" htmlType="submit" style={{marginRight: "8px"}}>
                Lưu
              </Button>
              <Button type="default" onClick={handleCancel}>
                Hủy
              </Button>
            </Form.Item>
          </Form>
      </Modal>

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