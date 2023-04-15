import { Input, Badge, Button} from "antd";
import Helper from "./../../../Common/Helper";
import { useDispatch, useSelector } from "react-redux";
import { changeNotes } from '../../Cart/cartSlice'
const { TextArea } = Input;
function CartFooter(props) {
  const dispatch = useDispatch();
  //const cartData = useSelector((state) => state.cart.cartItems);
  const cartState = useSelector((state) => state.cart);
  const tab = useSelector((state) => state.tab);
  const tabInfo = cartState.find(element => element.tabId === tab.currentTabId);
  let cartData = [];
  if(tabInfo !== undefined) cartData = tabInfo.cartItems;
  //const cartData = tabInfo.cartItems;
  
  let totalQuantity = 0;
  let totalPrice = 0;
  cartData.forEach(element => {
    totalQuantity += element.quantity
    totalPrice += element.quantity * element.display_price
  });
  const onChange = (e) => {
    dispatch(changeNotes({notes:e.target.value,tabId:tab.currentTabId}));
  };
  return (
    <div>
      <TextArea
        onChange={onChange}
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
    </div>
  );
}

export default CartFooter;
