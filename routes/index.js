var formidable = require('formidable')
var util = require('util');

var express = require('express');
var router = express.Router();

var mysql =require('mysql');
var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'food'
    });
    connection.connect();
router.get('/caipu', function(req, res, next) {
	var type = req.query.type;
	var sql=`SELECT * FROM 
	food.caipu 
	WHERE TYPE = '${type}';`
	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
})
router.get('/shicai', function(req, res, next) {
    var type = req.query.type;
    var sql=`SELECT * FROM 
        food.shicai `
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//用户注册时查询用户表[users]
router.post('/usersSELECT', function(req, res, next) {
    var username = req.body.username;
    var sql=`SELECT * FROM 
        food.users WHERE username='${username}'`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//用户注册模块
router.post('/usersINSERT', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var sql=`INSERT INTO food.users 
    (    
    username, 
    PASSWORD
    )
    VALUES
    ( 
    '${username}', 
    '${password}'
    );`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//用户登录模块
router.post('/usersLogin', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var sql=`SELECT * FROM 
        food.users
        WHERE
        username='${username}' AND PASSWORD='${password}';`
    connection.query(sql,(error,data)=>{
        // res.send(data);
        if(data.length>0)
        {
            res.send(data);
        }
        else{
            res.send({issuccess:'登录失败'});
        }
    })
})
//菜谱详情页-查询菜谱表[caipu]
router.get('/caipuxq', function(req, res, next) {
    var cpid = req.query.cpid;
    var sql=`SELECT * FROM 
    food.caipu 
    WHERE
    cpid = '${cpid}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//菜谱详情页-查询菜谱食材表[caipu_material]+
//个人中心页-我的菜谱-查询菜谱食材表[caipu_material]+
//搜索页-搜索菜谱-查询菜谱食材表[caipu_material]+ 
router.get('/caipuxq_material', function(req, res, next) {
    var cpid = req.query.cpid;
    var sql=`SELECT * FROM 
    food.caipu_material 
    WHERE
    cpid = '${cpid}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//菜谱详情页-查询菜谱工序表[caipu_process]
router.get('/caipuxq_process', function(req, res, next) {
    var cpid = req.query.cpid;
    var sql=`SELECT * FROM 
    food.caipu_process 
    WHERE
    cpid = '${cpid}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//菜谱详情页-查询菜谱做法步骤表[caipu_step]
router.get('/caipuxq_step', function(req, res, next) {
    var cpid = req.query.cpid;
    var sql=`SELECT * FROM 
    food.caipu_step
    WHERE
    cpid = '${cpid}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})

router.get('/collectSELECT', function(req, res, next) {
    var username = req.query.username;
    var cpid = req.query.cpid;
    var sql=`SELECT * FROM
    food.collect 
    WHERE
    username = '${username}' AND cpid = '${cpid}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//菜谱详情页-收藏菜谱-插入收藏表[collect]
router.get('/collectINSERT', function(req, res, next) {
    var username = req.query.username;
    var cpid = req.query.cpid;
    var sql=`INSERT INTO food.collect 
    (
    username,
    cpid
    )
    VALUES
    (
    '${username}', 
    '${cpid}'
    );`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//个人中心页-我的收藏-查询收藏表[collect]
router.get('/collectSELECTusername', function(req, res, next) {
    var username = req.query.username;
    var sql=`SELECT * FROM 
    food.collect 
    WHERE
    username = '${username}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//个人中心页-我的菜谱-查询菜谱表[caipu]
router.get('/mycaipuSELECTuserId', function(req, res, next) {
    var userId = req.query.userId;
    var sql=`SELECT * FROM 
    food.caipu 
    WHERE
    type = '${userId}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//收藏菜谱删除
router.get('/collectDELETE', function(req, res, next) {
    var cpid = req.query.cpid;
    var sql=`DELETE FROM food.collect 
    WHERE
    cpid = '${cpid}';`
    connection.query(sql,(error,data)=>{
        res.send({isdel:'删除成功'});
    })
})
//个人中心页-我的菜谱-删除我的菜谱-删除菜谱表数据[caipu]
router.get('/mycaipuDELETE', function(req, res, next) {
    var cpid = req.query.cpid;
    var sql=`DELETE FROM food.caipu 
    WHERE
    cpid = '${cpid}';`
    connection.query(sql,(error,data)=>{
        res.send({isdel:'删除成功'});
    })
})
//查询用户信息表
router.get('/usersInformation', function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    var sql=`SELECT * FROM 
        food.users
        WHERE
        username='${username}' AND PASSWORD='${password}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//修改密码
router.get('/usersPasswordChange', function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    var sql=`
        UPDATE food.users 
        SET 
        PASSWORD = '${password}' 
        WHERE
        username = '${username}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//修改资料
router.get('/usersusersInformationChange', function(req, res, next) {
    var username = req.query.username;
    var sex = req.query.sex;
    var nickname = req.query.nickname;
    var address = req.query.address;
    var email = req.query.email;
    var sql=`
        UPDATE food.users 
        SET
        sex = '${sex}',
        nickname = '${nickname}', 
        address = '${address}',
        email = '${email}'
        WHERE
        username = '${username}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})

//发布菜谱页-创建我的菜谱-插入菜名和我的ID到菜谱信息表[caipu] 
router.get('/mycaipuINSERTdishname', function(req, res, next) {
    var dishname = req.query.dishname;
    var userId = req.query.userId;
    var sql=`INSERT INTO food.caipu
    (
    cpdishes,
    type
    )
    VALUES
    (
    '${dishname}',
    '${userId}'
    );`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//发布菜谱-Form表单-改菜谱表[caipu]-设置菜谱信息：菜谱介绍+菜谱图片+菜谱食材+菜谱工序
router.get('/mycaipuUPDATEinfo', function(req, res, next) {
    var insertId = req.query.insertId;
    var introduce = req.query.introduce;
    var author = req.query.author;
    var face = req.query.face;
    console.log(insertId)
    console.log(introduce)
    console.log(author)
    console.log(face)
    var sql=`
        UPDATE food.caipu 
        SET 
        cpintroduce = '${introduce}',
        cpauthor = '${author}',
        cpface = '${face}'
        WHERE
        cpid = '${insertId}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})

//插入菜谱食材表[caipu_material] 所需食材+食材数量
router.get('/mycaipuINSERTsc', function(req, res, next) {
    var scname = req.query.scname;
    var scnum = req.query.scnum;
    var cpid = req.query.cpid;
    var sql=`INSERT INTO food.caipu_material 
    (
    scname,
    scnum,
    cpid
    )
    VALUES
    (
    '${scname}',
    '${scnum}',
    '${cpid}'
    );`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})
//菜谱大图上传
router.post('/post_uploadDishimg', function(req, res, next) {
  // 插入数据库
    var form = new formidable.IncomingForm();
    form.keepExtensions = true // 保留扩展名
    form.uploadDir = 'upload/' // 设置文件上传路径
    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
        // console.log('所有post参数', fields)
        var img_path = files.avatar.path;
        // console.log('获得的路径', img_path)
        img_path = img_path.replace(/\\/g, '\\\\')
        var positoin = img_path.indexOf('\\')
        var path1 = img_path.substring(positoin)
        img_path = 'http://localhost:3000/' + path1;
        // console.log('打印出的路径', 'http://127.0.0.1:3000/' + path1)
        // img_path = replaceAll(img_path)
        // console.log('fields', fields)
        console.log(fields.cpid)
        // sql_exe(fields, res, img_path)// 在此回调函数中才能得到文件上传的路径
        var sql_query = `UPDATE caipu 
        SET
        cpimg = '${img_path}'
        WHERE
        cpid = '${fields.cpid}'`
        connection.query(sql_query, function(err, rows, fields) {
            if (err) throw err;
            // console.log("头像修改成功");
        });
    });
});

//显示资料
router.get('/usersInformationShow', function(req, res, next) {
    var userid = req.query.userid;
    var sql=`SELECT * FROM 
        food.users
        WHERE
        id='${userid}';`
    connection.query(sql,(error,data)=>{
        res.send(data);
    })
})

//搜索菜谱
router.get('/caipuSEARCH', function(req, res, next) {
    var cpdishes = req.query.cpdishes;
    var sql=`SELECT * FROM 
    food.caipu 
    WHERE 
    cpdishes LIKE '%${cpdishes}%';`
    connection.query(sql,(error,data)=>{
    // console.log(data)
        res.send(data);
    })
})

//头像上传
router.post('/post_upload', function(req, res, next) {
  // 插入数据库
    var form = new formidable.IncomingForm();
    form.keepExtensions = true // 保留扩展名
    form.uploadDir = 'upload/' // 设置文件上传路径
    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
        // console.log('所有post参数', fields)
        var img_path = files.avatar.path;
        // console.log('获得的路径', img_path)
        img_path = img_path.replace(/\\/g, '\\\\')
        var positoin = img_path.indexOf('\\')
        var path1 = img_path.substring(positoin)
        img_path = 'http://localhost:3000/' + path1;
        // console.log('打印出的路径', 'http://127.0.0.1:3000/' + path1)
        // img_path = replaceAll(img_path)
        // console.log('fields', fields)
        // console.log(fields.userid)
        // sql_exe(fields, res, img_path)// 在此回调函数中才能得到文件上传的路径
        var sql_query = `UPDATE users 
        SET
        face = '${img_path}'
        WHERE
        id = '${fields.userid}'`
        connection.query(sql_query, function(err, rows, fields) {
            if (err) throw err;
            // console.log("头像修改成功");
        });
    });
});


/* GET home page. */


module.exports = router;
