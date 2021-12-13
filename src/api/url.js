export default {
    // 线上地址：buduiadmin.xingmangkeji.cn 密码123456
    baseUrl: 'http://budui.xingmangkeji.cn',
    // baseUrl: 'http://192.168.50.142:9001',
    // baseUrl: 'http://192.168.1.128:8094',
    // baseUrl:'http://pinapi.hxqhhhh.shop',
    login: '/admin/login', //登录
    category_list:'/admin/category_list',//分类列表
    save_category:'/admin/save_category',//新增和编辑分类
    del_category:'/admin/del_category',//删除分类
    product_list:'/admin/product_list',//商品列表
    upload_product_pic:'/admin/upload_product_pic',//上传商品图片
    save_product:'/admin/save_product',//新增或编辑商品
    del_product:'/admin/del_product',//删除商品
    update_product_status:'/admin/update_product_status',//商品状态修改
    homework_list:'/admin/homework_list',//家政列表
    save_homework:'/admin/save_homework',//新增或编辑家政服务
    upload_homework_pic:'/admin/upload_homework_pic',//上传家政服务图片
    del_homework:'/admin/del_homework',//删除家政服务
    update_homework_status:'/admin/update_homework_status',//修改家政服务状态
    vote_list:'/admin/vote_list',//投票列表
    add_vote:'/admin/add_vote',//新增投票
    del_vote:'/admin/del_vote',//删除投票
    add_vote_product:'/admin/add_vote_product',//商品添加到投票
    vote_product_list:'/admin/vote_product_list',//投票内的商品列表
    del_vote_product:'/admin/del_vote_product',//删除投票内商品
    product_order_list:'/admin/product_order_list',//用户点餐订单列表
    update_order_status:'/admin/update_order_status',//订单确认
    homework_order_list:'/admin/homework_order_list',//用户家政订单列表
    banner_list:'/admin/banner_list',//轮播图列表
    upload_banner_pic:'/admin/upload_banner_pic',//上传轮播图
    save_banner:'/admin/save_banner',//轮播图添加和编辑
    del_banner:'/admin/del_banner',//轮播图删除
    get_article:'/admin/get_article',//获取公告
    save_article:'/admin/save_article',//更改公告
    wenquan:'/admin/wenquan',//问卷调查
    wenquan_count:'/admin/wenquan_count',//
    // 
    productList:'/admin/product/list',//商品列表
    loginInfo:'/admin/login/info',
    productUpload:'/admin/product/upload',//上传商品图片
    categorySave:'/admin/category/save',//商品分类保存和编辑
    categoryIndex:'/admin/category/index',//商品分类列表
    productSave:'/admin/product/save',//添加商品和编辑
    categoryDel:'/admin/category/del',//商品分类删除
    productAttrs:'/admin/product/attrs',//获取商品规格属性
    productDescription:'/admin/product/description',//获取商品详情
    combinationDel:'/admin/combination/del',//删除拼团商品
    combinationSave:'/admin/combination/save',//添加拼团商品
    combinationList:'/admin/combination/list',//拼团商品列表
    combinationAttrs:'/admin/combination/attrs',//获取拼团商品规格
    combinationDescription:'/admin/combination/description',//获取拼团商品详情
    combinationShow:'/admin/combination/show',//拼团商品上下架
    productShow:'/admin/product/show',//商品上下架
    activitySave:'/admin/activity/save',//添加卖场活动
    activityIndex:'/admin/activity/index',//卖场活动列表
    activityDel:'/admin/activity/del',//删除卖场活动
    orderIndex:'/admin/order/index',//订单列表
    activityAdd_product:'/admin/activity/add_product',//添加卖场商品
    activityList_product:'admin/activity/list_product',//活动商品列表
    orderDelivery:'/admin/order/delivery',//订单发货
    activityList_gift:'/admin/activity/list_gift',//拼团有礼主题列表
    activityAdd_gift:'/admin/activity/add_gift',//添加和编辑拼团有礼主题
    activityDel_gift:'/admin/activity/del_gift',//删除拼团有礼主题
    activityDel_cate_gift:'/admin/activity/del_cate_gift',//删除拼团有礼下属分类
    activityAdd_cate_gift:'admin/activity/add_cate_gift',//添加拼团有礼下属分类
    activityDel_product:'admin/activity/del_product',//删除卖场活动商品
    uniqidIndex:'/admin/uniqid/index',//靓号列表
    uniqidAdd:'/admin/uniqid/add',//靓号添加
    uniqidDel:'/admin/uniqid/del',//靓号删除
    combinationAdd_product_cate:'/admin/combination/add_product_cate',//商品加入拼拼有礼分类
    combinationList_product_cate:'/admin/combination/list_product_cate',//拼团有礼分类下的商品,
    combinationDel_product_cate:'/admin/combination/del_product_cate',//删除拼拼有礼分类下的商品
    userIndex:'/admin/user/index',//用户列表
    webconfigSave:'/admin/webconfig/save',//配置文件修改
    webconfigIndex:'/admin/webconfig/index',//配置文件列表
    sell_order_list:'/admin/sell_order_list',//寄售列表
    confirm_sell_order:'/admin/confirm_sell_order',//同意寄售
    save_shipping_templates:'/admin/save_shipping_templates',//添加和编辑运费模版
    list_shipping_templates:'/admin/list_shipping_templates',//运费模板列表
    detail_shipping_templates:'/admin/detail_shipping_templates',//查看运费模版详情
    del_shipping_templates:'/admin/del_shipping_templates',//删除运费模板
    dashboard:'/admin/dashboard',//后台首页数据
    user_bill_log:'/admin/user_bill_log',//用户账户变动明细
    template_message_list:'/admin/template_message_list',//消息模版列表
    template_message_save:'/admin/template_message_save',//模板消息编辑
    user_extract:'/admin/user_extract',//用户提现列表
    upload_pic:'/admin/upload_pic',//上传轮播图和开屏页图片
    banner_add:'/admin/banner_add',//轮播图设置
    banner_edit:'/admin/banner_edit',//轮播图编辑
    banner_del:'/admin/banner_del',//轮播图删除
    open_pic_add:'/admin/open_pic_add',//开屏页设置
    open_pic:'/admin/open_pic',//开屏页查看
    open_pic_edit:'/admin/open_pic_edit',//开屏页编辑
    data_center:'/admin/data_center',//数据中心
    other_shipping_templates:'/admin/other_shipping_templates',//无分页的
    orderDel:'/admin/order/del',//订单删除
    updat_user_info:'/admin/updat_user_info',//修改用户信息
    article_list:'/admin/article_list',//文章列表
    article_add:'/admin/article_add',//添加文章
    article_edit:'/admin/article_edit',//编辑文章
    article_del:'/admin/article_del',//删除文章
    user_pintuan_log:'/admin/user_pintuan_log',//拼团记录
    user_pintuan_count:'/admin/user_pintuan_count',//拼团信息统计
}