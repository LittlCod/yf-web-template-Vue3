import asyncRoutes from '@/router/asyncRoutes.js';

function handleArr(arr, menu) {
    let newArr = [];
    arr.forEach(item => {
        if (menu.findIndex(mItem => mItem.name === item.meta.title) !== -1) {
            if (!item.children) {
                newArr.push(item);
            } else {
                newArr.push({
                    ...item,
                    children: handleArr(item.children, menu)
                });
            }
        }
    });
    return newArr;
}

export function handleMenu(menu) {
    const newMenu = handleArr(asyncRoutes, menu);
    return newMenu;
}