import { Layout, Col, Row } from 'antd';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
const { Content } = Layout;

function BodyContent(props) {

return (
    <Content style={{background: 'grey'}}>
        <div className="site-layout-content">
        <Row gutter={8}>
            <Col span={13} >
            <div className="main-content-display">
                <Cart />
            </div>
            </Col>
            <Col span={11}>
            <div className="main-content-display">
                <Product /> {/* has bug */}
            </div>
            </Col>
        </Row>
        </div>
    </Content>
)
}

export default BodyContent