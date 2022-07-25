import express from 'express'
import sharp from 'sharp'
import path from 'path'

const router = express.Router();

interface Options {
    root: string
}

const options: Options = {
    root: path.join(path.resolve(), 'converted-images')
};  


router.get('/image/:filepath', async (req, res) => {

    // OPTIONS & PARAMS
    const fileName: string = req.params.filepath;

    // Paths
    const fullPath: string = path.join(path.resolve(), 'images', fileName);
    const convertPath:string = path.join(path.resolve(), 'converted-images', fileName);

    // Side Params
    const h: any = req.query.height ? req.query.height : 400;
    const w: any = req.query.width ? req.query.width : 400;    

    // Resize AND Converting Images
    await sharp(fullPath).resize({ height: parseInt(h), width: parseInt(w) }).toFile(convertPath)
        .then(function(newFileInfo) {

            // newFileInfo holds the output file properties
            console.log("Success")
            res.type('image/png');

            // Return Coverted File
            res.status(200).sendFile(fileName, options, () => {
                console.log(`Converted on : ${path.resolve()}/converted-images/${fileName}`)
            })
            
        })
        // Handel Error
        .catch(function(err) {
            res.status(404).json({
                message: 'image not found 404'
            })
        })

})

export default router;