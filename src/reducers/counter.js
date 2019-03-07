export default function counterReducer(state={count:1},action){
    switch(action.type){
        case 'INCREMENT':
            return {
                count:action.count+20
            };
        case 'DECREMENT':
            return {
                count:action.count-3
            };
        default:
            return state;
    }
}