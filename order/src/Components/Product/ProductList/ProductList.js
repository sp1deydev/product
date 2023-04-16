import './ProductList.css'
import Products from '../../../Constants/Products';
import { Col, Row, Avatar, Card, Pagination} from 'antd';
import Helper from "./../../../Common/Helper";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from '../../Cart/cartSlice'

function ProductList(props) {
    const [categoryProducts, setCategoriesProducts] = useState([]);
    const tab = useSelector((state) => state.tab);
    useEffect(() => {
        //category product list
        if(props.category === "") {
            let data = [...Products]
            setCategoriesProducts(data);
        }
        else {
            let data = Products.filter(element => {
                if(props.category === element.category) {
                    return element
                }
            })
            setCategoriesProducts(data);
        }
    }, [props.category])

    const productsPerPage = 18; //how many products per page
    const [currentPage, setCurrentPage] = useState(1);
    //index of first and last product per page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    //get 12 product per page
    const displayProducts = categoryProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    //Using redux
    const dispatch = useDispatch()

    // event when you change page
    const onChangePage = (page) => {     
        setCurrentPage(page);
    };

    // add to cart action 
    const addToCart = (product) => {
        dispatch(addItem({product:product,tabId:tab.currentTabId}))
    };

    //create var items to store products list ui
    const items = displayProducts.map((product, index) => {
        return (
            <Col span={8} key={index}>
                <Card
                    hoverable
                    style={{ width: 'inherit' }}
                    onClick = {() => addToCart(product)}
                >
                    <Avatar src={product.image} className='avt' shape="square" size={54} />
                    <div className='infor'>
                        <div className='product-title'>{product.name}</div>
                        <span className='price'>{Helper.convertToVnd(product.price)}</span>
                    </div>
                </Card>
            </Col>
        );
    });

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
    );
}

export default ProductList;