const createBrand = (req:any,res:any) => {
    res.send(req.body)
}
const getBrands = (req:any,res:any) => {
    res.send(req.body)
}

module.exports = {
    createBrand,
    getBrands
}
