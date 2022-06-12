'use strict'

class ComponentService {
    constructor(app){
        this.app = app,
        this.name = 'component'
    }

    async queryOne(query){
        const data = await this.app.mysql.select(this.name, {
            where: query,
          });
          if (data && data.length > 0) {
            return data[0];
          }
          return null;
    }

    async insert(data) {
        const res = await this.app.mysql.insert(this.name, data);
        return res.insertId;
    }
}

module.exports = ComponentService