import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
})

myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        if (response.data.code == 401) {
            sessionStorage.setItem("isLogin", false);
            console.log(sessionStorage.getItem("isLogin"));
            router.push({
                path: "/"
            })
            router.go(0)
        }
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //????????????
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('???????????????', '404??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('??????????????????', '402??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data.code == 401) {
            sessionStorage.setItem("isLogin", false);
            console.log(sessionStorage.getItem("isLogin"));
            router.push({
                path: "/"
            })
            router.go(0)
        }
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //????????????
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('???????????????', '404??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('??????????????????', '402??????', {
            confirmButtonText: '??????',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '????????????') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    login(account, password) {
        return myPost({
            url: urls.login,
            data: {
                account,
                password,
            }
        })
    },
    category_list(obj) {
        return myGet({
            url: urls.category_list,
            params: {
                ...obj
            }
        })
    },
    save_category(obj) {
        return myPost({
            url: urls.save_category,
            data: {
                ...obj
            }
        })
    },
    del_category(obj) {
        return myPost({
            url: urls.del_category,
            data: {
                ...obj
            }
        })
    },
    product_list(obj) {
        return myGet({
            url: urls.product_list,
            params: {
                ...obj
            }
        })
    },
    async upload_product_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': sessionStorage.getItem("token"),
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_product_pic`, image, configs)
        return res.data
    },
    save_product(obj) {
        return myPost({
            url: urls.save_product,
            data: {
                ...obj
            }
        })
    },
    del_product(obj) {
        return myPost({
            url: urls.del_product,
            data: {
                ...obj
            }
        })
    },
    update_product_status(obj) {
        return myPost({
            url: urls.update_product_status,
            data: {
                ...obj
            }
        })
    },
    homework_list(obj) {
        return myGet({
            url: urls.homework_list,
            params: {
                ...obj
            }
        })
    },
    save_homework(obj) {
        return myPost({
            url: urls.save_homework,
            data: {
                ...obj
            }
        })
    },
    async upload_homework_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': sessionStorage.getItem("token"),
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_homework_pic`, image, configs)
        return res.data
    },
    del_homework(obj) {
        return myPost({
            url: urls.del_homework,
            data: {
                ...obj
            }
        })
    },
    update_homework_status(obj) {
        return myPost({
            url: urls.update_homework_status,
            data: {
                ...obj
            }
        })
    },
    get_article() {
        return myGet({
            url: urls.get_article,
        })
    },
    save_article(obj) {
        return myPost({
            url: urls.save_article,
            data: {
                ...obj
            }
        })
    },
    wenquan(obj) {
        return myGet({
            url: urls.wenquan,
            params: {
                ...obj
            }
        })
    },
    vote_list(obj) {
        return myGet({
            url: urls.vote_list,
            params: {
                ...obj
            }
        })
    },
    wenquan_count(obj) {
        return myGet({
            url: urls.wenquan_count,
            params: {
                ...obj
            }
        })
    },
    add_vote(obj) {
        return myPost({
            url: urls.add_vote,
            data: {
                ...obj
            }
        })
    },
    del_vote(obj) {
        return myPost({
            url: urls.del_vote,
            data: {
                ...obj
            }
        })
    },
    add_vote_product(obj) {
        return myPost({
            url: urls.add_vote_product,
            data: {
                ...obj
            }
        })
    },
    vote_product_list(obj) {
        return myGet({
            url: urls.vote_product_list,
            params: {
                ...obj
            }
        })
    },
    del_vote_product(obj) {
        return myPost({
            url: urls.del_vote_product,
            data: {
                ...obj
            }
        })
    },
    product_order_list(obj) {
        return myGet({
            url: urls.product_order_list,
            params: {
                ...obj
            }
        })
    },
    update_order_status(obj) {
        return myPost({
            url: urls.update_order_status,
            data: {
                ...obj
            }
        })
    },
    homework_order_list(obj) {
        return myGet({
            url: urls.homework_order_list,
            params: {
                ...obj
            }
        })
    },













    // 
    productList(obj) {
        return myGet({
            url: urls.productList,
            params: {
                ...obj
            }
        })
    },
    async productUpload(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/product/upload`, image, configs)
        return res.data
    },
    loginInfo() {
        return myGet({
            url: urls.loginInfo,
        })
    },
    categorySave(obj) {
        return myPost({
            url: urls.categorySave,
            data: {
                ...obj
            }
        })
    },
    categoryIndex(obj) {
        return myGet({
            url: urls.categoryIndex,
            params: {
                ...obj
            }
        })
    },
    productSave(obj) {
        return myPost({
            url: urls.productSave,
            data: {
                ...obj
            }
        })
    },
    categoryDel(id) {
        return myPost({
            url: urls.categoryDel,
            data: {
                id
            }
        })
    },
    productAttrs(id) {
        return myGet({
            url: urls.productAttrs,
            params: {
                id
            }
        })
    },
    productDescription(id) {
        return myGet({
            url: urls.productDescription,
            params: {
                id
            }
        })
    },
    combinationSave(obj) {
        return myPost({
            url: urls.combinationSave,
            data: {
                ...obj
            }
        })
    },
    combinationList(obj) {
        return myGet({
            url: urls.combinationList,
            params: {
                ...obj
            }
        })
    },
    combinationAttrs(id) {
        return myGet({
            url: urls.combinationAttrs,
            params: {
                id
            }
        })
    },
    combinationDescription(id) {
        return myGet({
            url: urls.combinationDescription,
            params: {
                id
            }
        })
    },
    combinationShow(obj) {
        return myPost({
            url: urls.combinationShow,
            data: {
                ...obj
            }
        })
    },
    productShow(obj) {
        return myPost({
            url: urls.productShow,
            data: {
                ...obj
            }
        })
    },
    activitySave(obj) {
        return myPost({
            url: urls.activitySave,
            data: {
                ...obj
            }
        })
    },
    activityIndex(obj) {
        return myGet({
            url: urls.activityIndex,
            params: {
                ...obj
            }
        })
    },
    activityDel(obj) {
        return myPost({
            url: urls.activityDel,
            data: {
                ...obj
            }
        })
    },
    orderIndex(obj) {
        return myGet({
            url: urls.orderIndex,
            params: {
                ...obj
            }
        })
    },
    activityAdd_product(obj) {
        return myPost({
            url: urls.activityAdd_product,
            data: {
                ...obj
            }
        })
    },
    activityList_product(obj) {
        return myGet({
            url: urls.activityList_product,
            params: {
                ...obj
            }
        })
    },
    orderDelivery(obj) {
        return myPost({
            url: urls.orderDelivery,
            data: {
                ...obj
            }
        })
    },
    activityList_gift() {
        return myGet({
            url: urls.activityList_gift,
        })
    },
    activityAdd_gift(obj) {
        return myPost({
            url: urls.activityAdd_gift,
            data: {
                ...obj
            }
        })
    },
    activityDel_gift(obj) {
        return myPost({
            url: urls.activityDel_gift,
            data: {
                ...obj
            }
        })
    },
    activityDel_cate_gift(obj) {
        return myPost({
            url: urls.activityDel_cate_gift,
            data: {
                ...obj
            }
        })
    },
    activityAdd_cate_gift(obj) {
        return myPost({
            url: urls.activityAdd_cate_gift,
            data: {
                ...obj
            }
        })
    },
    activityDel_product(obj) {
        return myPost({
            url: urls.activityDel_product,
            data: {
                ...obj
            }
        })
    },
    uniqidIndex(obj) {
        return myGet({
            url: urls.uniqidIndex,
            params: {
                ...obj
            }
        })
    },
    uniqidAdd(obj) {
        return myPost({
            url: urls.uniqidAdd,
            data: {
                ...obj
            }
        })
    },
    uniqidDel(obj) {
        return myPost({
            url: urls.uniqidDel,
            data: {
                ...obj
            }
        })
    },
    combinationAdd_product_cate(obj) {
        return myPost({
            url: urls.combinationAdd_product_cate,
            data: {
                ...obj
            }
        })
    },
    combinationList_product_cate(obj) {
        return myGet({
            url: urls.combinationList_product_cate,
            params: {
                ...obj
            }
        })
    },
    combinationDel_product_cate(obj) {
        return myPost({
            url: urls.combinationDel_product_cate,
            data: {
                ...obj
            }
        })
    },
    userIndex(obj) {
        return myGet({
            url: urls.userIndex,
            params: {
                ...obj
            }
        })
    },
    webconfigSave(obj) {
        return myPost({
            url: urls.webconfigSave,
            data: {
                ...obj
            }
        })
    },
    webconfigIndex() {
        return myGet({
            url: urls.webconfigIndex,
        })
    },
    sell_order_list(obj) {
        return myGet({
            url: urls.sell_order_list,
            params: {
                ...obj
            }
        })
    },
    confirm_sell_order(obj) {
        return myPost({
            url: urls.confirm_sell_order,
            data: {
                ...obj
            }
        })
    },
    save_shipping_templates(obj) {
        return myPost({
            url: urls.save_shipping_templates,
            data: {
                ...obj
            }
        })
    },
    list_shipping_templates(obj) {
        return myGet({
            url: urls.list_shipping_templates,
            params: {
                ...obj
            }
        })
    },
    detail_shipping_templates(obj) {
        return myGet({
            url: urls.detail_shipping_templates,
            params: {
                ...obj
            }
        })
    },
    del_shipping_templates(obj) {
        return myPost({
            url: urls.del_shipping_templates,
            data: {
                ...obj
            }
        })
    },
    dashboard() {
        return myGet({
            url: urls.dashboard,
        })
    },
    user_bill_log(obj) {
        return myGet({
            url: urls.user_bill_log,
            params: {
                ...obj
            }
        })
    },
    template_message_list(obj) {
        return myGet({
            url: urls.template_message_list,
            params: {
                ...obj
            }
        })
    },
    template_message_save(obj) {
        return myPost({
            url: urls.template_message_save,
            data: {
                ...obj
            }
        })
    },
    user_extract(obj) {
        return myGet({
            url: urls.user_extract,
            params: {
                ...obj
            }
        })
    },
    async upload_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_pic`, image, configs)
        return res.data
    },
    banner_add(obj) {
        return myPost({
            url: urls.banner_add,
            data: {
                ...obj
            }
        })
    },
    banner_list(obj) {
        return myGet({
            url: urls.banner_list,
            params: {
                ...obj
            }
        })
    },
    async upload_banner_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': `${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_banner_pic`, image, configs)
        return res.data
    },
    save_banner(obj) {
        return myPost({
            url: urls.save_banner,
            data: {
                ...obj
            }
        })
    },
    del_banner(obj) {
        return myPost({
            url: urls.del_banner,
            data: {
                ...obj
            }
        })
    },
    banner_edit(obj) {
        return myPost({
            url: urls.banner_edit,
            data: {
                ...obj
            }
        })
    },
    banner_del(obj) {
        return myPost({
            url: urls.banner_del,
            data: {
                ...obj
            }
        })
    },
    open_pic_add(obj) {
        return myPost({
            url: urls.open_pic_add,
            data: {
                ...obj
            }
        })
    },
    open_pic() {
        return myGet({
            url: urls.open_pic,
        })
    },
    open_pic_edit(obj) {
        return myPost({
            url: urls.open_pic_edit,
            data: {
                ...obj
            }
        })
    },
    data_center(obj) {
        return myGet({
            url: urls.data_center,
            params: {
                ...obj
            }
        })
    },
    other_shipping_templates(obj) {
        return myGet({
            url: urls.other_shipping_templates,
            params: {
                ...obj
            }
        })
    },
    orderDel(obj) {
        return myPost({
            url: urls.orderDel,
            data: {
                ...obj
            }
        })
    },
    updat_user_info(obj) {
        return myPost({
            url: urls.updat_user_info,
            data: {
                ...obj
            }
        })
    },
    article_list(obj) {
        return myGet({
            url: urls.article_list,
            params: {
                ...obj
            }
        })
    },
    article_add(obj) {
        return myPost({
            url: urls.article_add,
            data: {
                ...obj
            }
        })
    },
    article_edit(obj) {
        return myPost({
            url: urls.article_edit,
            data: {
                ...obj
            }
        })
    },
    article_del(obj) {
        return myPost({
            url: urls.article_del,
            data: {
                ...obj
            }
        })
    },
    user_pintuan_log(obj) {
        return myGet({
            url: urls.user_pintuan_log,
            params: {
                ...obj
            }
        })
    },
    user_pintuan_count(obj) {
        return myGet({
            url: urls.user_pintuan_count,
            params: {
                ...obj
            }
        })
    },
    combinationDel(obj) {
        return myPost({
            url: urls.combinationDel,
            data: {
                ...obj
            }
        })
    },
}