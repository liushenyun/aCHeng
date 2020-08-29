
const getCat = () => {
    let _data = localStorage.getItem('CHIP-CART')
    return (_data && JSON.parse(_data)) || {}
}

const setCat = (data) => {
    console.log(9, data)
    let _old = getCat()
    _old[data['SampleID']] = data
    console.log(10, _old)
    localStorage.setItem('CHIP-CART', JSON.stringify(_old))
}

const delCat = (list) => {
    let _old = getCat()
    list.forEach(v => {
        delete _old[v['SampleID']]
    });
    localStorage.setItem('CHIP-CART', JSON.stringify(_old))
}

export {
    setCat,
    getCat,
    delCat
}
