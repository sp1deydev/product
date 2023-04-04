import "./ProductFooter.css";
import { Button, Modal, Input, Form, Radio, message, InputNumber } from "antd";
import { useState, useEffect } from "react";
import Helper from "./../../../Common/Helper";
import Key from "../../../Constants/GetAuthKey";
import axios from "axios";
import moment from 'moment';

function ProductFooter(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0);
  const [returnAmount, setReturnAmount] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [discountType, setDiscountType] = useState("VND");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const { CartItems, currentCustomers } = props;
  const optionsDiscountType = [
    { label: "VND", value: "VND" },
    { label: "%", value: "Pecent" },
  ];
  let totalQuantity = 0;
  let totalPrice = 0;
  if (CartItems.length > 0) {
    CartItems.forEach((element) => {
      totalQuantity += element.quantity;
      totalPrice += element.quantity * element.price;
    });
  }
  let currentCustomerName =
    currentCustomers.value > 0 ? currentCustomers.label : "Khách lẻ";

  useEffect(() => {
    let total = 0;
    if (CartItems.length > 0) {
      CartItems.forEach((element) => {
        total += element.quantity * element.price;
      });
      if (discountAmount > 0) {
        if (discountType === "VND") total = total - discountAmount;
        else total = total * (1 - discountAmount / 100);
      }
      setFinalTotalPrice(total);
    }
  }, [CartItems]);

  useEffect(() => {
    setReceivedAmount(finalTotalPrice);
  }, [finalTotalPrice]);

  useEffect(() => {
    setReceivedAmount(finalTotalPrice);
    setReturnAmount(0);
  }, [finalTotalPrice]);

  const sendInvoice = () => {
    let inventoryItems = [];
    if (CartItems.length > 0) {
      CartItems.forEach((element) => {
        inventoryItems.push({hdnProductId:element.id,qty:element.quantity,listPrice:element.price,comment:element.note}); 
      });
    }
    let customerId =
    currentCustomers.value > 0 ? currentCustomers.value : 0;
    const currentDate = moment(new Date(), 'YYYY-MM-DD')
    let newInvoice = {
      items: inventoryItems,
      subject: "Hóa đơn bán hàng",
      contactid: customerId,
      invoicedate:  currentDate,
      duedate:  currentDate,
      subtotal: finalTotalPrice,
      total: finalTotalPrice
    };
    //Post api
    let postUrl = `${process.env.REACT_APP_API_URL}/modules/RestfulApi/Invoice/${Key}`;
    console.log("postUrl:", postUrl);
    axios
      .post(postUrl, new URLSearchParams(newInvoice))
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Tạo hóa đơn thành công",
        });
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Lỗi khi tạo hóa đơn, " + err.message,
        });
        console.log(err);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const payMoney = (value) => {
    setReturnAmount(value - finalTotalPrice);
    setReturnAmount(value - finalTotalPrice);
    setReceivedAmount(value);
  };

  //onChangeDiscount
  const onChangeDiscountType = ({ target: { value } }) => {
    setDiscountAmount(0);
    setDiscountType(value);
    setFinalTotalPrice(totalPrice);
  };

  //onChangeDiscountAmount
  const onChangeDiscountAmount = (value) => {
    let realAmount = 0;
    if (discountType === "VND") realAmount = totalPrice - value;
    else realAmount = totalPrice * (1 - value / 100);
    setFinalTotalPrice(realAmount);
    setDiscountAmount(value);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
  };
  return (
    <div>
      <Button type="primary" className="pay-btn" onClick={showModal}>
        THANH TOÁN
      </Button>
      <Modal
        className = "payModal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="summitBtn"
            type="primary"
            htmlType="submit"
            className="custom-button-size"
            onClick={sendInvoice}
          >
            THANH TOÁN
          </Button>,
        ]}
      >
        <Form
          {...formItemLayout}
          form={form}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Khách hàng" className="">
            <span className="ant-form-text">{currentCustomerName}</span>
          </Form.Item>
          <Form.Item label="Tổng tiền hàng">
            <span className="ant-form-text text-bg-default">
              {totalQuantity}
            </span>
            <span className="ant-form-text amount-total-cart">
              {Helper.convertToVnd(totalPrice)}
            </span>
          </Form.Item>
          <Form.Item label="Giảm giá">
            <InputNumber
              name="discount"
              value={discountAmount}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) => value.replace(/\$\s?|(\.*)/g, "")}
              onChange={onChangeDiscountAmount}
              placeholder="Nhập số tiền"
              className="discount-amount cart-cus-input "
              style={{ width: 200, float: "right", textAlign: "right" }}
            />
            <Radio.Group
              options={optionsDiscountType}
              onChange={onChangeDiscountType}
              value={discountType}
              optionType="button"
              buttonStyle="solid"
              style={{ float: "right", marginRight: 5 }}
            />
          </Form.Item>
          <Form.Item label="Thành tiền">
            <span className="ant-form-text amount-total-cart">
              {Helper.convertToVnd(finalTotalPrice)}
            </span>
          </Form.Item>
          <Form.Item label="Khách thanh toán">
            <InputNumber
              name="receivedAmount"
              value={receivedAmount}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }
              parser={(value) => value.replace(/\$\s?|(\.*)/g, "")}
              onChange={payMoney}
              placeholder="Nhập số tiền"
              className="discount-amount cart-cus-input "
              style={{ width: 200, float: "right", textAlign: "right" }}
            />
          </Form.Item>
          <Form.Item name="method" style={{ textAlign: "center" }}>
            <Radio.Group>
              <Radio value="1">Tiền mặt</Radio>
              <Radio value="2">Chuyển khoản</Radio>
              <Radio value="3">Thẻ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Tiền thừa:">
            <span className="ant-form-text amount-total-cart">
              {Helper.convertToVnd(returnAmount)}
            </span>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductFooter;
