import { FolderAddOutlined } from '@ant-design/icons';

class Category {
    constructor() {
        this.icon = <FolderAddOutlined />;
    }
}
  
async function getCategories() {
    var response = await fetch("http://192.168.1.12:8888/75/modules/RestfulApi/index.php?module=Auth&key=NEIXqqnsAdswvmYf");
    var data = await response.json();
  
    response = await fetch(`http://192.168.1.12:8888/75/modules/RestfulApi/Products/picklist/productcategory/${data.result}`);
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
  
// const Categories = []

export default Categories