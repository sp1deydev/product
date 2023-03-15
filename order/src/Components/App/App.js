import './App.css';
import { Layout, Menu, Col, Row } from 'antd';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
const { Header, Content, Footer } = Layout;
function App() {
  return (
    <div className="App">
      <Layout className="layout">
      <Header>
        <div className="logo" />
        {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        /> */}
      </Header>
      <Content style={{background: 'grey'}}>
        <div className="site-layout-content">
        <Row gutter={8}>
          <Col span={13} >
            <div className="main-content-display">
              <Cart/>
            </div>
          </Col>
          <Col span={11}>
            <div className="main-content-display">
              <Product/>
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
