import { Table } from "antd";
import React, { useEffect, useState } from "react";
import "./CartList.css";
import {
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  MinusOutlined,
  InfoCircleOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Button, Popover, Input, Modal, Tag, InputNumber } from "antd";
import Helper from "./../../../Common/Helper";
import CartFooter from "../CartFooter/CartFooter";
class CustomPrice {
  constructor() {
    this.rowId = 1;
    this.basePrice = 0;
    this.statePrice = 0;
    this.discountAmount = 0;
    this.discountPercent = 0;
  }
}
const { TextArea } = Input;

function CartList(props) {
  //STATE
  const [data, setData] = useState([]);
  //open note
  const [expandedKeys, setExpandedKeys] = useState([]);
  //open more button
  const [openPopover, setOpenPopover] = useState([]);
  const [price, setPrice] = useState({});
  const [newStatePrice, setNewStatePrice] = useState();
  const [discountPrice, setDiscountPrice] = useState({amount: "", percent: ""});
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (props.addToCart !== 1) {
      let cart = [...data];
      let index = cart.findIndex((item) => item.id === props.addToCart.id);
      if (index !== -1) {
        let item = [...data];
        item[index].quantity++;
        setData(item);
      } else {
        props.addToCart.note = "";
        props.addToCart.amount = "";
        props.addToCart.percent = "";
        cart.push(props.addToCart);
        let popover = [...openPopover];
        popover.push(false);
        setOpenPopover(popover);
        setData(cart);
      }
    }
  }, [props.changeValue]);

  //ACTION
  //DELETE A PRODUCT IN CART
  const handleDelete = (id) => {
    //find index of item that you wanna delete
    let index = data.findIndex((data) => data.id === id);
    let temp = [...data];
    temp[index].quantity = 1;
    temp.splice(index, 1);
    console.log("delete", temp);
    setData(temp);
  };
  //DECREASE QUANTITY OF PRODUCT
  const handleMinus = (id) => {
    let index = data.findIndex((data) => data.id === id);
    let temp = [...data];
    if (temp[index].quantity > 1) temp[index].quantity--;
    console.log("minus", temp);
    setData(temp);
  };

  //INCREASE QUANTITY OF PRODUCT
  const handleAdd = (id) => {
    let index = data.findIndex((data) => data.id === id);
    let temp = [...data];
    if (temp[index].quantity < 100) temp[index].quantity++;
    setData(temp);
  };
  const showModal = (element) => {
    let index = data.findIndex((data) => data.id === element.id)
    let price = {
        index: index,
        rowId: element.id, 
        basePrice: element.purchase_cost,
        statePrice: element.price,
        err: false,
    };
    setDiscountPrice({amount: data[index].amount, percent: data[index].percent})
    setPrice(price);
    setIsModalOpen(true);
    setNewStatePrice(element.price)
  };

  const handleCancel = () => {
    if(price.err === false) {
      let index = data.findIndex(element => element.id === price.rowId)
      let newData = [...data]
      newData[index].price = newStatePrice;
      newData[index].amount = discountPrice.amount;
      newData[index].percent = discountPrice.percent;
      setData(newData)
      setIsModalOpen(false);
    }
    else
      setIsModalOpen(true);
   };
   //change amout
   const onChangeAmount = (value) => {      
        setDiscountPrice({amount: value, percent: ""});
        let updatePrice = value
        if(value === null)
          updatePrice = 0
        if(updatePrice < price.basePrice) {
            let newPrice = {...price}
            newPrice.err = true;
            setPrice(newPrice)
            if(updatePrice < 0)
                setNewStatePrice(0)
            else
                setNewStatePrice(updatePrice)
        }
        else {
            let newPrice = {...price}
            newPrice.err = false;
            setPrice(newPrice)
            setNewStatePrice(updatePrice)
          }
        }
        
    const onChangePercent = (value) => {
        setDiscountPrice({amount: "", percent: value});
        let updatePrice = price.statePrice - ((price.statePrice * value) / 100)
        if(updatePrice < price.basePrice) {
          let newPrice = {...price}
          newPrice.err = true;
          setPrice(newPrice)
            if(updatePrice < 0)
            setNewStatePrice(0)
            else
            setNewStatePrice(updatePrice)
          }
          else {
            let newPrice = {...price}
            newPrice.err = false;
            setPrice(newPrice)
            setNewStatePrice(updatePrice)
          }
        }
        
        


    //Toggle expand note
  const handleToggleExpand = (element) => {
    let index = expandedKeys.findIndex((item) => item === element.id);

    //close popover when click note button
    let popoverIndex = data.findIndex((item) => item.id === element.id);
    let popover = [...openPopover];
    popover[popoverIndex] = false;
    setOpenPopover(popover);

    if (index === -1) {
      let temp = [...expandedKeys];
      temp = [];
      //keep display note that is not null
      expandedKeys.forEach((key) => {
        let subIndex = data.findIndex((item) => item.id === key);
        if (subIndex !== -1)
          if (data[subIndex].note !== "") temp.push(data[subIndex].id);
      });
      temp.push(element.id);
      setExpandedKeys(temp);
    } else {
      let temp = [...expandedKeys];
      temp.splice(index, 1);
      setExpandedKeys(temp);
    }
  };

  //get data in note text area
  const onNote = (event, record) => {
    let newData = [...data];
    let index = newData.findIndex((item) => item.id === record.key);
    newData[index].note = event.target.value;
    setData(newData);
  };

  //open popover
  const handlePopover = (index) => {
    let popover = [...openPopover];
    popover.forEach((elm, index) => {
      popover[index] = false;
    });
    popover[index] = true;
    setOpenPopover(popover);
  };
  const columns = [
    {
      title: "",
      dataIndex: "index",
      render: (index) => {
        return <p>{index}</p>;
      },
      width: "4%",
    },
    {
      title: "",
      dataIndex: "delete",
      render: (id) => {
        return (
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(id)}
            danger
          />
        );
      },
      width: "6%",
    },
    {
      title: "",
      dataIndex: "quantity",
      render: (element) => {
        return (
          <React.Fragment>
            <Button
              type="text"
              icon={<MinusOutlined />}
              onClick={() => handleMinus(element.id)}
            />
            &nbsp;
            <b>{element.quantity}</b>
            &nbsp;
            <Button
              type="text"
              icon={<PlusOutlined />}
              onClick={() => handleAdd(element.id)}
            />
          </React.Fragment>
        );
      },
      width: "14%",
    },
    {
      title: "",
      dataIndex: "name",
      width: "38%",
    },
    {
      title: "",
      dataIndex: "subtotal",
      render: (element) => {
        return (
          <React.Fragment>
            <Button type="text" onClick={() => showModal(element)}>
              {Helper.convertToVnd(parseInt(element.price))}
            </Button>
          </React.Fragment>
        );
      },
    },
    {
      title: "",
      dataIndex: "total",
      render: (total) => {
        return (
          <b>
            <i>{Helper.convertToVnd(total)}</i>
          </b>
        );
      },
    },
    {
      title: "",
      dataIndex: "action",
      render: ({ element, index }) => {
        const content = [
          <Button
            key="note"
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              handleToggleExpand(element);
            }}
          >
            Ghi chú
          </Button>,
          <br key="endline"></br>,
          <Button key="detail" type="text" icon={<InfoCircleOutlined />}>
            Xem chi tiết
          </Button>,
        ];

        return (
          <Popover
            placement="leftTop"
            open={openPopover[index]}
            content={<React.Fragment>{content}</React.Fragment>}
            trigger="click"
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
              onClick={() => {
                handlePopover(index);
              }}
            />
          </Popover>
        );
      },
      width: "6%",
    },
  ];
  //DATA OF TABLE
  const dataSource = data.map((element, index) => {
    return {
      key: element.id,
      delete: element.id,
      index: index + 1,
      name: element.name,
      quantity: element,
      subtotal: element,
      total: parseInt(element.price) * element.quantity,
      action: { element, index },
    };
  });
  return (
    <React.Fragment>
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={{ y: 10 }}
      footer={() => <CartFooter cartData={data}/>}
      expandable={{
        rowExpandable: (record) => true,
        expandedRowRender: (record) => {
          return (
            <TextArea
              rows={1}
              placeholder="Ghi chú cho sản phẩm"
              maxLength={200}
              onChange={(event) => {
                onNote(event, record);
              }}
              style={{}}
              className="note"
            />
          );
        },
      }}
      expandIconColumnIndex={-1}
      expandedRowKeys={expandedKeys}
    />
    <Modal
        title="Điều chỉnh giá bán"
        open={isModalOpen}
        onCancel={handleCancel}
        width={300}
        footer={[]}
      >
        <Input
          placeholder="Đơn giá"
          value = {Helper.convertToVnd(parseInt(newStatePrice))}
          style={{ width: '100%', marginBottom: 12, fontWeight: 'bold' }}
          disabled
        />
        <InputNumber
            placeholder="Giá mới "
            value={discountPrice.amount}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            style={{ width: '100%', marginBottom: 12 }}
            onChange={onChangeAmount}
        />
        <InputNumber
            placeholder="Giảm giá theo %"
            value={discountPrice.percent}
            style={{ width: '100%', marginBottom: 12 }}
            onChange={onChangePercent}
        />
        
        {price.err ? <Tag icon={<CloseCircleOutlined />} hidden={price.err} color="error" style={{ width: '100%'}}>
                Giá bán đang nhỏ hơn giá vốn
            </Tag> 
            :
            ""
        }
      </Modal>
    </React.Fragment>
  );
}

export default CartList;
