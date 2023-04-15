import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, decreaseQty, increaseQty, addItemNotes, changeItemPrice } from '../../Cart/cartSlice'
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
const { TextArea } = Input;

function CartList(props) {
  //STATE 
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.cart);
  const tab = useSelector((state) => state.tab);
  const tabInfo = cartState.find(element => element.tabId === tab.currentTabId);
  let data = [];
  if(tabInfo !== undefined) data = tabInfo.cartItems;
  const [expandedKeys, setExpandedKeys] = useState([]);
  //open more button
  const [openPopover, setOpenPopover] = useState([]);
  const [price, setPrice] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('currentTabId:', props.currentTabId);
  }, [props.currentTabId])

  // useEffect(() => {
  //   console.log('price',  price);
  //   if(price && !price.err) dispatch(changeItemPrice(price))
  // }, [price])

  //ACTION
  //DELETE A PRODUCT IN CART
  const handleDelete = (product) => {
    dispatch(removeItem({product:product,tabId:tab.currentTabId}))
  };
  //DECREASE QUANTITY OF PRODUCT
  const handleMinus = (id) => {
    dispatch(decreaseQty({id:id,tabId:tab.currentTabId}));
  };

  //INCREASE QUANTITY OF PRODUCT
  const handleAdd = (id) => {
   dispatch(increaseQty({id:id,tabId:tab.currentTabId}));
  };
  const showModal = (element) => {
    let index = data.findIndex((data) => data.id === element.id);
    let price = {
      index: index,
      rowId: element.id,
      basePrice: element.purchase_cost,
      productListPrice: element.price,
      display_price: element.display_price,
      statePrice: element.display_price,
      discount_percent: element.discount_percent,
      discount_amount: element.discount_amount,
      err: false,
    };
    setPrice(price);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //change amout
  const onChangeAmount = (value) => {
    let updatePrice = parseFloat(price.productListPrice) - parseFloat(value);
    if (value === null) updatePrice = 0;
    if (updatePrice < price.basePrice) {
      let newPrice = { ...price };
      newPrice.err = true;
      setPrice(newPrice);
    } else {
      let newPrice = { ...price };
      newPrice.tabId = tab.currentTabId;
      newPrice.display_price = updatePrice;
      newPrice.discount_amount = value;
      newPrice.discount_percent = 0;
      newPrice.err = false;
      setPrice(newPrice);
      dispatch(changeItemPrice(newPrice));
    }
  };

  const onChangePercent = (value) => {
    let updatePrice =
      price.productListPrice - (price.productListPrice * value) / 100;
    if (updatePrice < price.basePrice) {
      let newPrice = { ...price };
      newPrice.err = true;
      setPrice(newPrice);
    } else {
      let newPrice = { ...price };
      newPrice.tabId = tab.currentTabId;
      newPrice.display_price = updatePrice;
      newPrice.discount_amount = '';
      newPrice.discount_percent = value;
      newPrice.err = false;
      setPrice(newPrice);
      dispatch(changeItemPrice(newPrice));
    }
  };

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
  const onNote = (event,record) => {
    dispatch(addItemNotes({id:record.key, note:event.target.value, tabId:tab.currentTabId}));
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
      render: (element) => {
        return (
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(element)}
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
              {Helper.convertToVnd(parseInt(element.display_price))}
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
      delete: element,
      index: index + 1,
      name: element.name,
      quantity: element,
      subtotal: element,
      total: parseInt(element.display_price) * element.quantity,
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
        footer={() => <CartFooter cartData={data} />}
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
          value={Helper.convertToVnd(parseInt(price.productListPrice))}
          style={{ width: "100%", marginBottom: 12, fontWeight: "bold" }}
          disabled
        />
        <InputNumber
          placeholder="Giảm giá trực tiếp "
          value={price.discount_amount}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          style={{ width: "100%", marginBottom: 12 }}
          onChange={onChangeAmount}
        />
        <InputNumber
          placeholder="Giảm giá theo %"
          value={price.discount_percent}
          style={{ width: "100%", marginBottom: 12 }}
          onChange={onChangePercent}
        />

        {price.err ? (
          <Tag
            icon={<CloseCircleOutlined />}
            hidden={price.err}
            color="error"
            style={{ width: "100%" }}
          >
            Giá bán đang nhỏ hơn giá vốn
          </Tag>
        ) : (
          ""
        )}
      </Modal>
    </React.Fragment>
  );
}

export default CartList;
