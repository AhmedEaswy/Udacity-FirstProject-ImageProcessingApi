const validateImage = (height: (number | string), width: (number | string)): boolean => {
  return (
    typeof height === 'number' &&
    height > 1 &&
    typeof width === 'number' &&
    width > 1
  )
}

export default validateImage
