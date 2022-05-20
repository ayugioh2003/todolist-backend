const successHandle = ({
  res,
  statusCode = 200,
  status = 'success',
  message = '操作成功',
  data = {},
  ...otherData
}) => {
  return res.status(statusCode).json({
    status,
    message,
    ...otherData,
    data,
  })
}

module.exports = {
  successHandle,
}
