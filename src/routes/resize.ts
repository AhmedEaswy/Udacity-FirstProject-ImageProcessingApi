import express from 'express'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import imageProcess from '../utilites/imageProcess'
import { Options, FileOptions } from '../types/imageInterface'
import validateImage from '../utilites/validateImage'

const router = express.Router()

const options: Options = {
  root: path.join(path.resolve(), 'converted-images'),
}

router.get(
  '/image/:filepath',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const height = req.query.height ? req.query.height : 400,
          width = req.query.width ? req.query.width : 400;

    // OPTIONS & PARAMS
    const processOptions: FileOptions = {
      fileName: req.params.filepath,
      fullPath: path.join(path.resolve(), 'images', req.params.filepath),
      convertPath: path.join(
        path.resolve(),
        'converted-images',
        path.parse(req.params.filepath).name + `${height}x${width}` + '.png',
      ),
      covertedFileName: path.parse(req.params.filepath).name + `${height}x${width}` + '.png',
      h: height,
      w: width,
    }

    // get input image dismentions
    const image = fs.existsSync(processOptions.convertPath)
      ? await sharp(processOptions.convertPath).metadata()
      : null

    // Resize AND Converting Images
    if (
      image
      ? image.height == parseInt(processOptions.h) &&
        image.width == parseInt(processOptions.w)
      : false) {
      // Return Coverted File
      if (
        await validateImage(
          parseInt(processOptions.h),
          parseInt(processOptions.w)
        )
      ) {
        res.type('image/png')
        res.status(200).sendFile(processOptions.covertedFileName, options, () => {
          console.log(`Alreay Converted on : ${processOptions.convertPath}`)
        })
      } else {
        res.status(404).json({
          message: 'Please Enter A Valid Size',
        })
      }
    } else {
      const myFunc = await imageProcess(processOptions)
      if (myFunc === 'success') {
        res.status(200).sendFile(path.parse(processOptions.fileName).name + `${processOptions.h}x${processOptions.w}` + '.png', options, () => {
          console.log(`Converted on : ${processOptions.convertPath}`)
        })
      } else {
        res.status(404).json({
          message: myFunc,
        })
      }
    }
  }
)

export default router
