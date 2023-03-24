import { FolderAddOutlined } from '@ant-design/icons';
class Category {
    constructor() {
        this.icon = <FolderAddOutlined />;
    }
}
  
async function getCategories() {
    var response = await fetch(`${process.env.REACT_APP_API_URL}modules/RestfulApi/index.php?module=Auth&key=${process.env.REACT_APP_API_KEY}`);
    var data = await response.json();
    response = await fetch(`${process.env.REACT_APP_API_URL}modules/RestfulApi/Products/picklist/productcategory/${data.result}`);   
    data = await response.json();
    return data.result.values;
}
  
const dataList = await getCategories();
const Categories = [];
var category = new Category();
Object.keys(dataList).map(elem => {
    category.label = elem;
    category.key = elem;
  
    Categories.push(category);
    category = new Category();
});
export default Categories