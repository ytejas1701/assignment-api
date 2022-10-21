const validateFields = async ({ body }, res, next)=>{
    try{
        const validFields = ["name", "imageURL","author","pages","price"];
        const invalidFields = [];

        Object.keys(body).forEach(field => {
            if(!validFields.includes(field)) invalidFields.push(field);
        });

        if(invalidFields.length!==0) throw new Error(`invalid field(s): ${invalidFields.join(', ')}`);

        next();

    }catch(error){
        res.status(401).send(error.message);
    }
}

export default validateFields;