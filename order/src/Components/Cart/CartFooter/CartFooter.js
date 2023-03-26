import { Input, Badge, Button} from "antd";
import Helper from "./../../../Common/Helper";
const { useState } = "React";
const { TextArea } = Input;
function CartFooter(props) {
  //const [total, setTotal] = useState(0);
  const {cartData} = props;
  let totalQuantity = 0;
  let totalPrice = 0;
  cartData.forEach(element => {
    totalQuantity += element.quantity
    totalPrice += element.quantity * element.price
  });
  return (
    <div>
      <TextArea
        placeholder="Ghi chú cho đơn hàng"
        autoSize={{ maxRows: 2 }}
        style={{ width: "56%" }}
      />

      <Badge 
        count={totalQuantity} 
        showZero 
        overflowCount={999} 
        color='blue' 
        offset={[8, 16]}
      >
        <Button type="link" style={{ marginLeft: '0px', color: '#000', cursor: 'auto'}}>Tổng tiền hàng</Button>
      </Badge>

      <Button type="link" style={{ fontWeight: "500", fontStyle: 'italic' , float:"right" ,color: '#000', cursor: 'auto'}}>{Helper.convertToVnd(totalPrice)}</Button>
      {/* <span style={{ width: "20%",  float:"right"  }}>Tổng tiền hàng ({props.changeValue}) { Helper.convertToVnd(props.total) }</span> */}
    </div>
  );
}

export default CartFooter;
