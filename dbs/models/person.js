const mongoose = require('mongoose')

//创建数据表模型，该文件的名字，即person，就是数据表的名字
//下面给person表声明两个字段name和age

let personSchema = new mongoose.Schema({
    name: String,
    age: Number
})

//通过建model给person赋予增删改查等读写的功能
module.exports = mongoose.model('Person', personSchema)