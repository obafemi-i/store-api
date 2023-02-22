
const products = require('../models/models')

const getAllProductsStatic = async (req,res)=>{
    const prod = await products.find({featured:true})
    res.status(200).json({prod})
}

const getAllProducts = async (req,res)=>{
    const {featured, company, name, sort, fields, numFilters } = req.query
    const queryObject = {}

    if(featured){queryObject.featured= featured === 'true' ? true:false}

    if (comapny){queryObject.comapny = company}

    if(name){queryObject.name = {$regex:name, $options:'i'}}

    if(numFilters){
         const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
         }
         const regExp = /\b(<|>|<=|>=|=)\b/g
         let filters = numFilters.replace(regExp, (match)=>`-${operatorMap[match]}-`)
         const options = ['price', 'rating']
         filters = filters.split(',').foreach((item)=>{
            const [field, operator, value] = item.split('-')
            if (options.includes(fields)){
                queryObject[fields] = {[operator]:Number(value)}
            }
         })
    }

    let result =  products.find(queryObject)
    if (sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{

    }
    if (fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.fields(fieldsList)
    }

    const prod = await result
    res.status(200).json({prod})
}

module.exports = {getAllProducts, getAllProductsStatic}