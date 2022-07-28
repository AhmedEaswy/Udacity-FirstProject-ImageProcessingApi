import path from 'path'
import imageProcess from '../utilites/imageProcess'
import { FileOptions } from '../types/imageInterface'
import validateImage from '../utilites/validateImage'

const processOptions: FileOptions = {
  fullPath: path.join(path.resolve(), 'images', 'fjord.jpg'),
  convertPath: path.join(path.resolve(), 'converted-images', 'fjord500X500.png'),
  h: 500,
  w: 500,
  covertedFileName: 'fjord500X500.png',
  fileName: 'fjord.jpg',
}

const processOptionsFailed: FileOptions = {
  fullPath: path.join(path.resolve(), 'images', 'fjordtestgsgdshfa.jpg'),
  convertPath: path.join(path.resolve(), 'converted-images', 'fjord.jpg'),
  h: 400,
  covertedFileName: 'fjordtestgsgdshfa.png',
  w: 400,
  fileName: 'fjordtestgsgdshfa.jpg',
}

describe('Image Transform Functionality', () => {
  it('Expect to Transform Image', async () => {
    const exportedImage = await imageProcess(processOptions)
    expect(exportedImage).toBe('success')
  })

  it('Expect to Throm Error That Image Not Found', async () => {
    const exportedImage = await imageProcess(processOptionsFailed)
    expect(exportedImage).not.toBe('success')
  })

  it('Validate Image Size From Params', async () => {
    const validation = validateImage(100, 100)
    const validationError = validateImage('a', -1)
    expect(validation).toBe(true)
    expect(validationError).toBe(false)
  })
})
