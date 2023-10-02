import React from 'react'
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [{ id: 1, name: 'Book 1', price: 10, quantity: 1, date: '2012-05-13' },
      { id: 2, name: 'Book 2', price: 15, quantity: 1, date: '2014-02-12' },
      { id: 3, name: 'Book 3', price: 20, quantity: 1, date: '2013-02-25' },],
    }
  }

  addBooks(event, id) {
    this.setState({
      books: this.state.books.map(book => {
        if (book.id === id) {
          book.quantity++
        }
        return book
      }),
    })
  }
  removeBooks(event, id) {
    this.setState({
      books: this.state.books.map(book => {
        if (book.id === id) {
          book.quantity--
        }
        return book
      })
    })
  }
  render() {
    return <div>
      <table>
        <thead>
          <tr>
            <th>书籍名称</th>
            <th>出版日期</th>
            <th>价格</th>
            <th>购买数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.books.map(book => {
              return <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.date}</td>
                <td>{book.price}</td>
                <td>{book.quantity}</td>
                <td>
                  <button onClick={(e) => { this.addBooks(e, book.id) }}>+</button>
                  <button onClick={(e) => { this.removeBooks(e, book.id) }}>-</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  }
}
