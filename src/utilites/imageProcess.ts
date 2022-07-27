import sharp from 'sharp'

import { FileOptions } from '../types/imageInterface'



const imageProcess = async (
  fileOptions: FileOptions
): Promise<Error | string> => {
  return await sharp(fileOptions.fullPath)
    .resize({
      height: Number(fileOptions.h),
      width: Number(fileOptions.w),
    })
    .toFile(fileOptions.convertPath)
    .then(function () {
      // newFileInfo holds the output file properties
      return 'success'
    })
    .catch(function (err: Error) {
      return err
    })
}

export default imageProcess
