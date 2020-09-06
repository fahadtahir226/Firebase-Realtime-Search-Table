export const usersDetailsReducer = (state = [{
    u_ig_username: '-',
    u_ig_fullname: '-',
    u_email: '-',
		u_ig_followers_count: '-',
    u_ig_following_count: '-',
		u_ig_category: '-',
		u_ig_bio: '-',
}], action)  => {
  switch(action.type){
    case 'ADD':
      return state.concat(action.payload)
    case 'REPLACE':
      return action.payload
    default:
      return state
  }
}