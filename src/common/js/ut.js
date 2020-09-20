import Vue from 'vue'

const getCat = () => {
    let _data = localStorage.getItem('CHIP-CART')
    return (_data && JSON.parse(_data)) || {}
}

const setCat = (data) => {
    let _old = getCat()
    _old[data['SampleID']] = data
    localStorage.setItem('CHIP-CART', JSON.stringify(_old))
    Vue.prototype.$bus.$emit('computedCount', getCat())
}

const delCat = (list) => {
    console.log(16, list)
    let _old = getCat()
    list.forEach(v => {
        delete _old[v['SampleID']]
    });
    localStorage.setItem('CHIP-CART', JSON.stringify(_old))
    Vue.prototype.$bus.$emit('computedCount', getCat())
    Vue.prototype.$bus.$emit('updatePageCatData', getCat())
}

export {
    setCat,
    getCat,
    delCat
}
