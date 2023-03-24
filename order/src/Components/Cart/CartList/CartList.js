import { Table, Modal, Input } from "antd";
import React, { useEffect, useState } from "react";
import "./CartList.css";
import {
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Helper from "./../../../Common/Helper";
class CustomPrice {
  constructor() {
      this.rowId = 1;
      this.basePrice = 0;
      this.discountAmount = 0;
      this.discountPercent = 0;
  }
}
function CartList(props) {
  //STATE
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (props.addToCart !== 1) {
      let cart = [...data];
      let index = cart.findIndex((item) => item.id === props.addToCart.id);
      if (index !== -1) {
        let item = [...cart];
        item[index].quantity++;
        setData(item);
      } else {
        cart.push(props.addToCart);
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
    setData(temp);
  };

  //DECREASE QUANTITY OF PRODUCT
  const handleMinus = (id) => {
    let index = data.findIndex((data) => data.id === id);
    let temp = [...data];
    if (temp[index].quantity > 1) temp[index].quantity--;
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
    let price = new CustomPrice(element.id,element.price,0,0);
    console.log("price:",price);
    setPrice(price);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      width: "46%",
      render: (name) => {
        return <p>{name}</p>;
      },
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
      render: () => {
        return <Button type="text" icon={<MoreOutlined />} />;
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
    };
  });
  const modal = () => {
    console.log("isModalOpen:", isModalOpen);
    return (
      <Modal
        title="Điều chỉnh giá bán"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={300}
      >
        <Input
          id="originalPrice"
          placeholder="Đơn giá gốc"
          suffix="đ"
          style={{ width: 200, marginBottom: 6 }}
          disabled
        />
        <br />
        <Input
          id="discountPrice"
          placeholder="Giảm giá trực tiếp"
          suffix="đ"
          style={{ width: 200, marginBottom: 6 }}
        />
        <br />
        <Input
          id="discoundPercent"
          placeholder="Giảm giá theo %"
          suffix="%"
          style={{ width: 200 }}
        />
      </Modal>
    );
  };
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={{ y: 10 }}
      footer={modal}
    />
  );
}

export default CartList;
