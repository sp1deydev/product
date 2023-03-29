import './App.css';
import { Layout, Menu, Col, Row, Input, Tabs } from 'antd';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { useState, useRef } from 'react';
const { Header, Content, Footer } = Layout;

function App() {
  //STATE
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

  //++++++++++++++++++++++++++++++++++++++++++++++
  const initialItems = [
    { label: 'Tab 1', children: 'Content of Tab 1', key: '1' },
    {
      label: 'Hoa don 2',
      children: <Content style={{background: 'grey'}}>
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
    </Content>,
      key: '2',
      closable: false,
    },
  ];
    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);
  
    const onChange = (newActiveKey) => {
      setActiveKey(newActiveKey);
    };
  
    const add = () => {
      const newActiveKey = `newTab${newTabIndex.current++}`;
      const newPanes = [...items];
      newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
      setItems(newPanes);
      setActiveKey(newActiveKey);
    };
  
    const remove = (targetKey) => {
      let newActiveKey = activeKey;
      let lastIndex = -1;
      items.forEach((item, i) => {
        if (item.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const newPanes = items.filter((item) => item.key !== targetKey);
      if (newPanes.length && newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newPanes[lastIndex].key;
        } else {
          newActiveKey = newPanes[0].key;
        }
      }
      setItems(newPanes);
      setActiveKey(newActiveKey);
    };
  
    const onEdit = (targetKey, action) => {
      if (action === 'add') {
        add();
      } else {
        remove(targetKey);
      }
    };

  //==============================================
  return (
    <div className="App">
      <Layout className="layout">
      <Header>
        <Input className="logo" placeholder="Search" />
        {/* <Menu
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
        /> */}
        {/* <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
          items={items}
        /> */}
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
