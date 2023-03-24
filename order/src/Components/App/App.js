import './App.css';
import { Layout, Menu, Col, Row, Input } from 'antd';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { useState } from 'react';

const { Header, Content, Footer } = Layout;

function App() {
  //STATE
  const [addToCart, setAddToCart] = useState(1);
  //giá trị thay đổi để useEffect của component CartList chạy
  const [changeValue, setChangeValue] = useState(1);

  //ACTION 
  //add to cart action
  const onAddToCart = (product) => {
    if(changeValue === 2)
      setChangeValue(0);
    setChangeValue(changeValue + 1);
    setAddToCart(product);
  };

  return (
    <div className="App">
      <Layout className="layout">
      <Header>
        <Input className="logo" placeholder="Search" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(1).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `Bill ${key}`,
            };
          })}
        />
      </Header>
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
              <Product onAddToCart={onAddToCart}/>
            </div>
          </Col>
        </Row>
        </div>
      </Content>
    </Layout>
    </div>
  );
}

export default App;
