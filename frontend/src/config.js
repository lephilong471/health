export const config = {
    proxy: process.env.REACT_APP_PROXY,
    host: process.env.REACT_APP_HOST,
    image_path: `${process.env.REACT_APP_PROXY}/static/public`,
    admin_path: `${process.env.REACT_APP_ADMIN_PATH}`
}

export const checkType = (type) =>{
    switch(type){
        case 0: return 'Nhãn khoa'
        case 1: return 'Nhi khoa'
        default: return 'Sản phẩm khác'
    }
}

export function formatNumber(num, decimals = 0, decPoint = '.', thousandsSep = ',') {
    num = parseFloat(num).toFixed(decimals);
    let parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
    return parts.join(decPoint)+ " VNĐ";
}

export function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    return specialChars.test(str);
}