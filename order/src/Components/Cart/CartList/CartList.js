import { Table } from "antd";
import React, { useEffect, useState } from "react"
import './CartList.css'
import { DeleteOutlined, MoreOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button } from 'antd';


function CartList(props) {
    //STATE
    const [data, setData] = useState([]);
    useEffect(()=> {
        console.log(props.addToCart)
        if(props.addToCart !== 1) {
            let cart = [...data]
            let index = cart.findIndex(item => item.id === props.addToCart.id);
            if(index !== -1) {
                let item = [...cart]
                item[index].quantity++;
                setData(item);
            }
            else {
                cart.push(props.addToCart)
                setData(cart);
            }
        }
    }, [props.changeValue])

    //ACTION 
    //DELETE A PRODUCT IN CART
    const handleDelete = (id) => {
        //find index of item that you wanna delete
        let index = data.findIndex(data => data.id === id)
        let temp = [...data]
        temp[index].quantity = 1;
        temp.splice(index, 1)
        console.log("delete", temp);
        setData(temp)
    }
    //DECREASE QUANTITY OF PRODUCT
    const handleMinus = (id) => {
        let index = data.findIndex(data => data.id === id)
        let temp = [...data]
        if(temp[index].quantity > 1)
            temp[index].quantity--
        console.log("minus", temp);
        setData(temp)
    }

    //INCREASE QUANTITY OF PRODUCT
    const handleAdd = (id) => {
        let index = data.findIndex(data => data.id === id)
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
    //DATA OF TABLE
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
