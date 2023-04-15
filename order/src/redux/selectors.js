export const todoListSelector = (state) => {
    // const todoListReturn = state.todoList.filter(
    //     (todo) => {return todo.name.includes(state.filter.search)}
    // )
    return state.todoList;
}
export const searchTextSelector = (state) => state.filters.search