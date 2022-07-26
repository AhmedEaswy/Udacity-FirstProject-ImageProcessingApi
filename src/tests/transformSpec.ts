import path from 'path'
import imageProcess from '../utilites/imageProcess'
import { FileOptions } from '../types/imageInterface'

const processOptions: FileOptions = {
  fullPath: path.join(path.resolve(), 'images', 'fjord.jpg'),
  convertPath: path.join(path.resolve(), 'converted-images', 'fjord.jpg'),
  h: 400,
  w: 400,
  fileName: 'fjord.jpg'
}


const processOptionsFailed: FileOptions = {
    fullPath: path.join(path.resolve(), 'images', 'fjordtestgsgdshfa.jpg'),
    convertPath: path.join(path.resolve(), 'converted-images', 'fjord.jpg'),
    h: 400,
    w: 400,
    fileName: 'fjord.jpg'
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
})