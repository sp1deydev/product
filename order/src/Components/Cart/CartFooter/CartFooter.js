import { Input, Space, Button } from "antd";
import Helper from "./../../../Common/Helper";
const { useState } = "React";
const { TextArea } = Input;
function CartFooter(props) {
  //const [total, setTotal] = useState(0);
  return (
    <div style={{display:"flex"}}>
      <TextArea
        placeholder="Ghi chú cho đơn hàng"
        autoSize={{ maxRows: 2 }}
        style={{ width: "60%", top: -20, float:"left" }}
      />
      <span style={{ width: "20%",  float:"right"  }}>Tổng tiền hàng ({props.changeValue}) { Helper.convertToVnd(props.total) }</span>
    </div>
  );
}

export default CartFooter;
