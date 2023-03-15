import { Table } from "antd";
import React, { useState } from "react"
import './CartList.css'
import { DeleteOutlined, MoreOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button } from 'antd';


function CartList(props) {
    var cart = [
        {
            "id": 1,
            "name": "Iphone 11 64GB",
            "image": "https://cdn.tgdd.vn/Products/Images/42/153856/iphone-xi-tim-200x200.jpg",
            "price": 2000,
            "quantity": 1,
            "isOnCart": false
          },
          {
            "id": 2,
            "name": "Samsung S22 5G 128GB",
            "image": "https://cdn.tgdd.vn/Products/Images/42/231110/Galaxy-S22-Black-600x600.jpg",
            "price": 1500,
            "quantity": 2,
            "isOnCart": false
          },
          {
            "id": 3,
            "name": "Xiaomi Redmi Note 10S 8GB",
            "image": "https://cdn.tgdd.vn/Products/Images/42/235969/xiaomi-redmi-note-10s-xanh-1-200x200.jpg",
            "price": 800,
            "quantity": 3,
            "isOnCart": false
          },
          {
            "id": 4,
            "name": "Huawei P50 Pro 5G",
            "image": "https://cdn.tgdd.vn/Products/Images/42/226196/huawei-p50-pro-600x600.jpg",
            "price": 1320,
            "quantity": 4,
            "isOnCart": false
          },
    ]

    const [data, setData] = useState(cart);
    //DELETE A PRODUCT IN CART
    const handleDelete = (id) => {
        //find index of item that you wanna delete
        let index = data.findIndex(data => data.id == id)
        let temp = [...data]
        temp.splice(index, 1)
        setData(temp)
    }
    //DECREASE QUANTITY OF PRODUCT
    const handleMinus = (id) => {
        let index = data.findIndex(data => data.id == id)
        let temp = [...data]
        if(temp[index].quantity > 1)
            temp[index].quantity--
        setData(temp)
    }

    //INCREASE QUANTITY OF PRODUCT
    const handleAdd = (id) => {
        let index = data.findIndex(data => data.id == id)
        let temp = [...data]
        if(temp[index].quantity < 100)
            temp[index].quantity++
        setData(temp)
    }


    const columns = [
        {
            title: '',
            dataIndex: 'index',
            render:  (index) => {
                return <p>{index}</p>
            },
            width: '4%'
        },
        {
            title: '',
            dataIndex: 'delete',
            render:  id => {
                return <Button type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(id)} danger/>
            },
            width: '6%'
        },
        {
            title: '',
            dataIndex: 'quantity',
            render: (element) => {
                return (
                    <React.Fragment>
                        <Button type="text" icon={<MinusOutlined />} onClick={() => handleMinus(element.id)} />
                        &nbsp;
                        <b>{element.quantity}</b>
                        &nbsp;
                        <Button type="text" icon={<PlusOutlined />} onClick={() => handleAdd(element.id)}/>
                    </React.Fragment>
                )
            },
            width: '14%'
        },
        {
            title: '',
            dataIndex: 'name',
            width: '46%'
        },
        {
            title: '',
            dataIndex: 'subtotal',
            render: (sub) => {
                return <i>{sub}</i>
            }
        },
        {
            title: '',
            dataIndex: 'total',
            render: (total) => {
                return <b><i>{total}</i></b>
            }
        },
        {
            title: '',
            dataIndex: 'action',
            render:  () => {
                return (
                    <Button type="text" icon={<MoreOutlined />} />
                )
            },
            width: '6%'
        },
    ]

    const dataSource = data.map((element, index) => {
        return {
            key: element.id,
            delete: element.id,
            index: index + 1,
            name: element.name,
            quantity: element,
            subtotal: element.price,
            total: element.price * element.quantity
        }
    })
    return (
        <Table 
            columns={columns} 
            dataSource={dataSource}
            pagination={false}
            scroll={{y: 10}}
            footer={() => 'Footer'}
        />
    )
}

export default CartList
