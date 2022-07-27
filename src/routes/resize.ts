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
    // OPTIONS & PARAMS
    const processOptions: FileOptions = {
      fullPath: path.join(path.resolve(), 'images', req.params.filepath),
      convertPath: path.join(
        path.resolve(),
        'converted-images',
        req.params.filepath
      ),
      h: req.query.height ? req.query.width : 400,
      w: req.query.width ? req.query.width : 400,
      fileName: req.params.filepath,
    }

    // get input image dismentions
    const image = fs.existsSync(processOptions.convertPath)
      ? await sharp(processOptions.convertPath).metadata()
      : null

    // Resize AND Converting Images
    if (image) {
      // Return Coverted File
      if (
        await validateImage(
          Number(processOptions.h),
          Number(processOptions.w)
        )
      ) {
        res.type('image/png')
        res.status(200).sendFile(processOptions.fileName, options, () => {
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
        res.status(200).sendFile(processOptions.fileName, options, () => {
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
