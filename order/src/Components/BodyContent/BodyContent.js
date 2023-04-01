import { Layout, Menu, Col, Row, Input, Tabs } from 'antd';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { useState, useRef } from 'react';
const { Header, Content, Footer } = Layout;


function BodyContent() {
    const [addToCart, setAddToCart] = useState(1);
    //giá trị thay đổi để useEffect của component CartList chạy
    const [changeValue, setChangeValue] = useState(0);

    //ACTION 
    //add to cart action
    const onAddToCart = (product) => {
        console.log("addToCart",addToCart)
        console.log("changeValue",changeValue)
        console.log(product)
        if(changeValue === 2)
        setChangeValue(0);
        setChangeValue(changeValue + 1);
        setAddToCart(product);
        console.log("end")
    };


return (
    <Content style={{background: 'grey'}}>
        <div className="site-layout-content">
        <Row gutter={8}>
            <Col span={13} >
            <div className="main-content-display">
                <Cart addToCart={addToCart} changeValue={changeValue}/>
            </div>
            </Col>
            <Col span={11}>
            <div className="main-content-display">
                <Product onAddToCart={onAddToCart}/> {/* has bug */}
            </div>
            </Col>
        </Row>
        </div>
    </Content>
)
}

export default BodyContent