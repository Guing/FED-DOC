默认所有同学都已非常熟悉Restful APl。而GraphQL大家可能比较陌生，会放慢节奏。

而GraphQL是和Restful API完全不同的两种设计和实现方式，两者也尽量不要混用（虽然混用也能做到无 bug)

# 什么是 GraphQL

GraphQL - Graph Query Language图查询语言。意思是擅长处理"图"数据结构的查询，即多个数据对象，各个之间还有关联关系。



核心概念：

- schema - 数据规范
- rootValue - 数据源

代码演示，可参考[中文官网](https://graphql.cn/graphql-js/)。注意，在此不要深入进去，还是沿着课程主线走。

```javascript
var express = require('express') ;
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// 使用GraphQL Schema Language创建一个schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var rootValue = { hello: () => 'Hello world!' };
 
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
```

另外，虽然GraphQL主要用于查询，但它也支持输入和更新，参考官网 input和Mutation。课程就不在继续扩展了。

# GraphQL 的应用场景

- 数据关系比较复杂。PS︰和我们正好相反，我们是作品的数据结构复杂（前端编辑器复杂)，而数据实体之间的关系比较清晰。前端查询需求多变，如果用Restful API会导致频繁的修改API，不灵活。
- 有一个独立的数据提供方，对接很多使用方，不能——定制开发

# 如何选择

选择使用Restful API，放弃GraphQL 。

- 并不匹配它的使用场景
- 考虑它的缺点∶
- 学习使用成本高，不如Restful API普及
- 当数据结构复杂时，效率较低
- 维护数据源和 schema 也比较复杂
