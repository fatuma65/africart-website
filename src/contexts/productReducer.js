
const initialState = {
    productTitle: '',
    description:'',
    price:'',
    productImage: null,
    loading: false
}
export const productReducer = (state=initialState, action) => {
    switch(action.type) {
        case "CREATE_PRODUCTS":
            return [ ...state, action.payload ]
            
        default:
            return state
    }
}
