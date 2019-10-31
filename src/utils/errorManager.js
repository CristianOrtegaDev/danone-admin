export const errorMsgHandler = (error, baseErrorMsg) => {
  const response = error.response && error.response.data
  if (response && response.business_errors && response.business_errors.length) {
    return response.business_errors[0]
  }
  return baseErrorMsg
}
