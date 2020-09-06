export const addQuery = data => {
  return { 
    type: 'ADD',
    payload: data
  }
} 
export const replaceQuery = data => {
  return { 
    type: 'REPLACE',
    payload: data
  }
}

export const newCurrentUserInfo = data => {
  return {
    type: 'NEW',
    payload: data
  }
}
export const newCurrentPostInfo = data => {
  return {
    type: 'NEW',
    payload: data
  }
}