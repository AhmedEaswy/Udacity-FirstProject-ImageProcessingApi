import express from 'express'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const router = express.Router()

interface Options {
  root: string
}

const options: Options = {
  root: path.join(path.resolve(), 'converted-images'),
}

router.get('/image/:filepath', async (req, res): Promise<void> => {
  // OPTIONS & PARAMS
  const fileName: string = req.params.filepath

  // Paths
  const fullPath: string = path.join(path.resolve(), 'images', fileName)
  const convertPath: string = path.join(
    path.resolve(),
    'converted-images',
    fileName
  )

  // Side Params
  const h: any = req.query.height ? req.query.height : 400,
        w: any = req.query.width ? req.query.width : 400;
        
  // get input image dismentions
  const image = fs.existsSync(convertPath)
    ? await sharp(convertPath).metadata()
    : null

  // Resize AND Converting Images
  if (
    image ? image.height == parseInt(h) && image.width == parseInt(w) : false
  ) {
    // Return Coverted File
    res.type('image/png')
    res.status(200).sendFile(fileName, options, () => {
      console.log(
        `Alreay Converted on : ${path.resolve()}/converted-images/${fileName}`
      )
    })
  } else {
    await sharp(fullPath)
      .resize({
        height: parseInt(h),
        width: parseInt(w),
      })
      .toFile(convertPath)
      .then(function () { // (newFileInfo)
        // newFileInfo holds the output file properties
        console.log('Success')
        res.type('image/png')
        // Return Coverted File
        res.status(200).sendFile(fileName, options, () => {
          console.log(
            `Converted on : ${path.resolve()}/converted-images/${fileName}`
          )
        })
      })
      // Handel Error
      .catch(function () {
        res.status(404).json({
          message: 'image not found 404',
        })
      })
  }
})

export default router
