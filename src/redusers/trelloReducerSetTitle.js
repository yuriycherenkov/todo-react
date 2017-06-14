
const initState = [
   
];

export default function testReducer (state = initState, action) {
    switch (action.type) {
        case 'TEST_REDUCER':
           return state;
        default:
            return state;
    }
}
