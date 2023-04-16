import "./App.css";
import { Layout, Tabs, AutoComplete } from "antd";
import BodyContent from "../BodyContent/BodyContent";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeTab } from "../Cart/tabSlice";
import { addCart, removeCart } from "../Cart/cartSlice";
import { addItem } from '../Cart/cartSlice'
const { Header } = Layout;

function App() {
  //STATE
  const dispatch = useDispatch();
  const tab = useSelector((state) => state.tab);
  const cartState = useSelector((state) => state.cart);
  
  const productList = useSelector((state) => state.product);
  console.log("produc list on App:",productList);
  const [options, setOptions] = useState([]);
  const [activeKey, setActiveKey] = useState(1);
  const initTabs = [];
  if (cartState.length > 1) {
    cartState.map((cart, index) => {
      const item = {
        label: "Hóa đơn " + cart.tabId,
        children: <BodyContent currentTabId={cart.tabId} tabId={cart.tabId} />,
        key: cart.tabId,
        closable: cart.tabId !== 1,
      };
      initTabs.push(item);
    });
  } else {
    initTabs.push({
      label: "Hóa đơn 1",
      children: <BodyContent currentTabId={1} tabId={1} />,
      key: 1,
      closable: false,
    });
  }
  const initialItems = initTabs;

  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(initTabs.length);

  //++++++++++++++++++++++++++++++++++++++++++++++

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
    dispatch(activeTab(newActiveKey));
  };

  const handleProductSearch = (value) => {
    var filterList = [];
    productList.forEach(function (option) {
      console.log("option:",option);
      if (option.name.toLowerCase().indexOf(value) > -1 || option.productcode.toLowerCase().indexOf(value) > -1 ) {
        var someNewValue = { key: option.id, value: option.name };
        filterList.push(someNewValue);
      }
    });
    setOptions(filterList);
  };

  const handleProductSelect = (value, option) => {
    let product = productList.find(prod=>prod.id === option.key);
    dispatch(addItem({product:product, tabId: tab.currentTabId}));
    setOptions([]);
  };

  useEffect(() => {
    if (tab.isClosed) remove(tab.currentTabId);
  }, [tab.isClosed]);

  const add = () => {
    newTabIndex.current++;
    console.log(`adding:`, newTabIndex);
    const newPanes = [...items];

    newPanes.push({
      label: `Hóa đơn ${newTabIndex.current}`,
      children: (
        <BodyContent
          currentTabId={newTabIndex.current}
          tabId={newTabIndex.current}
        />
      ),
      key: newTabIndex.current,
    });
    setItems(newPanes);
    setActiveKey(newTabIndex.current);
    dispatch(addCart(newTabIndex.current));
    dispatch(activeTab(newTabIndex.current));
  };

  const remove = (targetKey) => {
    dispatch(removeCart(targetKey));
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
    dispatch(activeTab(newActiveKey));
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
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
          <AutoComplete
            className="logo"
            allowClear={true}
            style={{ width: 200 }}
            options={options}
            onSearch={handleProductSearch}
            onSelect={(val, option) => handleProductSelect(val, option)}
            placeholder="Tìm thuốc theo tên hoặc mã"
          />
          <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
          />
        </Header>
      </Layout>
    </div>
  );
}

export default App;
