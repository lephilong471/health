export const config = {
    proxy: 'http://127.0.0.1:5000',
    host: 'http://127.0.0.1:3000',
    image_path: 'http://127.0.0.1:5000/static/public'
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