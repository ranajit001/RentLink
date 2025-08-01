import PropertyModel from "../../models/Property.js";

export const getAllProps = async (req,res) => { 
                                                
      const id = req.params.id;

  try {

    if(id){
        const property = await PropertyModel.findById(id);
        return res.status(200).json(property)
    }

      const{search='',minRent,maxRent,sort='createdAt',order= "asc",isRented,currentPage=1,itemsPerPage=24}= req.query;

      const searchObj = {}

      if(search.trim().length>0){  
          searchObj.$or=[
            {title:{$regex:search,options:'i'}},
            {address:{$regex:search,options:'i'}},
            {description:{$regex:search,options:'i'}},
            ]
        }
        if(minRent)
                searchObj.rent.$gte = +minRent;
        if(maxRent)
                searchObj.rent.$lte = +maxRent;
        if(isRented=="true")
                searchObj.isRented = true;
        if(isRented=="false")
                searchObj.isRented = false;

        const sortObj = {};
                sortObj[sort] = order=='asc'? 1:-1;

      const searchProducts = await PropertyModel.aggregate([
 
           { $match:searchObj},
            {$sort:sortObj},
            {$skip: (currentPage-1)*itemsPerPage},
            {$limit:itemsPerPage}
    
      ]);


      res.status(200).json(searchProducts)
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}