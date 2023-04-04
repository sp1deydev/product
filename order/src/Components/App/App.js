import './App.css';
import { Layout, Menu, Col, Row, Input, Tabs } from 'antd';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import BodyContent from '../BodyContent/BodyContent';
import { useState, useRef } from 'react';
const { Header, Content, Footer } = Layout;

function App() {
  //STATE
  const [currentTabId, setCurrentTabId] = useState("new")
  const initialItems = [
    {
      label: 'Hóa đơn 1',
      children: <BodyContent currentTabId={currentTabId} tabId={0}/>,
      key: 0,
      closable: false,
    },
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(1);
  
  //++++++++++++++++++++++++++++++++++++++++++++++
  
    const onChange = (newActiveKey) => {
      console.log("current ID", currentTabId)
      setCurrentTabId(newActiveKey)
      setActiveKey(newActiveKey);
    };
  
    const add = () => {
      newTabIndex.current++
      const newPanes = [...items];
      console.log(`adding ${newTabIndex.current}`)
      newPanes.push({ label: `Hóa đơn ${newTabIndex.current}`, children: <BodyContent currentTabId={newTabIndex.current} tabId={newTabIndex.current}/>, key: newTabIndex.current });
      setItems(newPanes);
      setActiveKey(newTabIndex.current);
      setCurrentTabId(newTabIndex.current)
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
      setCurrentTabId(newActiveKey);
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
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
          items={items}
        />
      </Header>
      {/* <Content style={{background: 'grey'}}>
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
      </Content> */}
    </Layout>
    </div>
  );
}

export default App;
