import multer from 'multer'
export const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'./uploads')
    },
    filename: function (req,file,cb) {
        const uniquesuff = Date.now()+'-'+ Math.round(Math.random() * 1E9)
        cb(null,file.filename+'-'+uniquesuff)
    }
})