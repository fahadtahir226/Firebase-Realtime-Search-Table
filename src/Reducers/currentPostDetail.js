export const currentPostDetailsReducer = (state = null, action)  => {
  switch(action.type){
    case 'NEW':
      return action.payload
    default:
      return state
  }
}