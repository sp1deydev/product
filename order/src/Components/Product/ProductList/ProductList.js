import './ProductList.css'
import Products from '../../../Constants/Products';
import { Col, Row, Avatar, Card, Pagination} from 'antd';
import { useEffect, useState } from 'react';


function ProductList(props) {
    const productsPerPage = 18; //how many products per page
    const [currentPage, setCurrentPage] = useState(1);

    //index of first and last product per page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    //get 12 product per page
    const displayProducts = Products.slice(indexOfFirstProduct, indexOfLastProduct);
    
    // event when you change page
    const onChangePage = (page) => {
        console.log(page);
        setCurrentPage(page);
    };

    //create var items to store products list ui
    const items = displayProducts.map((product, index) => {
        return (
            <Col span={8} key={index}>
                 <Card
                    hoverable
                    style={{ width: 'inherit' }}
                >
                    <Avatar src={product.image} className='avt' shape="square" size={54} />
                    <div className='infor'>
                        <div className='product-title'>{product.name}</div>
                        <span className='price'>{product.price}$</span>
                    </div>
                </Card>
            </Col>
        )
    })
    return (
        <div className="container-product-list">
            <Row gutter={[16, 16]}>

                {/* DISPLAY PRODUCTS LIST */}
                {items}

                {/* DISPLAY PAGINATION */}
                <Pagination
                    size='small'
                    total={Products.length}
                    current={currentPage}
                    showSizeChanger={0}
                    pageSize={18}
                    className='pagination'
                    onChange={onChangePage}
                />
            </Row>
        </div>
    )
}

export default ProductList;