import sharp from 'sharp'
import path from 'path'

import { Options, FileOptions } from '../types/imageInterface'

const options: Options = {
    root: path.join(path.resolve(), 'converted-images'),
}

async function imageProcess(fileOptions: FileOptions) {
    return await sharp(fileOptions.fullPath)
    .resize({
      height: parseInt(fileOptions.h),
      width: parseInt(fileOptions.w)
    })
    .toFile(fileOptions.convertPath)
    .then(function (newFileInfo) {
      // newFileInfo holds the output file properties
      return 'success';
    })
    .catch(function(err: Error) {
        return err;
    })
}

export default imageProcess;