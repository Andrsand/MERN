const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000 // 2 - Определяем порт для запуска (если есть системная переменная port - используем её, иначе ставим порт - 3000)

const app = express() // 1 - создание объекта нашего приложения
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() { // 4 - асинхронная функция для запуска базы данных и вервера
  try {
    await mongoose.connect(
      'mongodb+srv://vladilen:1q2w3e4r@cluster0-ua4e7.mongodb.net/todos',
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )
    app.listen(PORT, () => { // 3 - запуск сервера 
      console.log('Server has been started...') // colback - на случай если сервер уже запущен
    })
  } catch (e) {
    console.log(e)
  }
}

start() // 5 - запуск функции start
