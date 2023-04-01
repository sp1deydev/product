import "./ProductFooter.css";
import { Button, Modal, Input, Form, Radio, message } from "antd";
import { useState } from "react";
import Key from "../../../Constants/GetAuthKey";
import axios from "axios";

function ProductFooter(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    let newCustomer = {
      tempId: Date.now(),
      firstname: values.firstname ? values.firstname : "",
      lastname: values.lastname ? values.lastname : "",
      phone: values.phone ? values.phone : "",
      email: values.email ? values.email : "",
      mailingstreet: values.mailingstreet ? values.mailingstreet : "",
      birthday: values.birthday ? values.birthday : "",
      label:
        (values.firstname ? values.firstname : "") + " " + values.lastname
          ? (values.firstname ? values.firstname : "") + " " + values.lastname
          : "",
    };
    //Post api
    let postUrl = `${process.env.REACT_APP_API_URL}/modules/RestfulApi/Contacts/${Key}`;
    console.log("postUrl:", postUrl);
    axios
      .post(postUrl, new URLSearchParams(newCustomer))
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Thêm khách hàng thành công",
        });
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Lỗi khi thêm khách hàng, " + err.message,
        });
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Button type="primary" className="pay-btn" onClick={showModal}>
        THANH TOÁN
      </Button>
      <Modal
        style={{ top: 0, right:0, position:"absolute", width: 460 }}
        bodyStyle={{height: "100%"}}
        open={isModalOpen}
        footer={[]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="customer"></Form.Item>
          <Form.Item label="Tổng tiền hàng"></Form.Item>
          <Form.Item label="Giảm giá" name="discount">
            <Input placeholder="Nhập số tiền" />
          </Form.Item>
          <Form.Item label="Thành tiền"></Form.Item>
          <Form.Item label="Khách thanh toán" name="amount">
            <Input placeholder="Nhập số tiền" />
          </Form.Item>
          <Form.Item>
            <Radio.Group onChange="" value="">
              <Radio value={1}>Tiền mặt</Radio>
              <Radio value={2}>Chuyển khoản</Radio>
              <Radio value={3}>Thẻ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "8px" }}
            >
              THANH TOÁN
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductFooter;
