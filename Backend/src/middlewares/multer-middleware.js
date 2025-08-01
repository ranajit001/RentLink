import multer from "multer";
import { storage } from "../configs/multer.js";


export const upload = multer({
    storage:storage,
    limits:{
        fileSize:10*1024*1024
    },
    fileFilter: function(req,file,cb){
        const mime = file.mimetype;
        if(  mime.startsWith('image/') ||mime.startsWith('video/'))
                                                                    cb(null,true)
        else
             cb(new Error('Medias must be in image or video formate'))
    } 
});



export const checkSize = (req,res,next)=>{
    const files = req.files;
    if(!files) return next()
for(let file of files){
            const isImage = file.mimetype.startsWith(`image/`)
        const isVideo = file.mimetype.startsWith(`video/`);
        if(isImage && file.size>5*1024*1024)
                return res.status(400).json({message:'Max image size is 5 mb'})
        if(isVideo && file.size>10*1024*1024)
                return res.status(400).json({message:'Video must be with in 10 mb'})

    }
        next()
}