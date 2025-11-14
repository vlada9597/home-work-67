Home-Work-67 — Використання курсорів та агрегаційних запитів у MongoDB через Express


📖 Опис проекту
Цей проект демонструє роботу з MongoDB Atlas через сервер Express.js, включаючи:
* роботу з курсорами (streaming documents)
* виконання агрегаційних запитів
* читання даних через find()
* ефективну обробку великих колекцій

Проєкт побудований на Node.js (ES Modules), Express.js та MongoDB Native Driver.

-------------------

🚀 Як запустити проєкт
1. Встанови залежності:
npm install

2. Створи .env файл:
MONGO_URI=your-mongodb-atlas-uri

3. Запусти сервер:
node app.js

Очікуваний результат:

[dotenv@17] injecting env
✅ MongoDB Atlas connected
🚀 Server running at http://localhost:3000

📂 Маршрути API

Нижче наведено всі маршрути, опис логіки, та приклади перевірки через curl.

🟦 1. GET /users/cursor — Отримання даних курсором
✔ Опис:

Цей маршрут демонструє використання курсора замість збереження всіх документів у пам'яті.

Курсор читає документи поступово, що підходить для великих колекцій.

📌 Код:
const cursor = db.collection("users").find({});
cursor.forEach(user => console.log(user));

🧪 Перевірка в терміналі:
curl http://localhost:3000/users/cursor


Очікувана відповідь:

{
  "message": "Users streamed with cursor"
}


(Усі документи зʼявляться у терміналі сервера → це демонстрація роботи курсора)

🟦 2. GET /users — Читання всіх користувачів (find)
✔ Опис:

Повертає масив усіх документів колекції users.

🧪 Перевірка:
curl http://localhost:3000/users


Очікувана відповідь:

[
  { "_id": "...", "name": "Alice", "age": 25 },
  { "_id": "...", "name": "Bob", "age": 30 }
]

🟦 3. GET /users/aggregate — Агрегаційний запит
✔ Опис:

Агрегація збирає статистику по віку:

середній вік

мінімальний

максимальний

кількість користувачів

📌 Використовується pipeline:
[
  { $group: {
      _id: null,
      avgAge: { $avg: "$age" },
      minAge: { $min: "$age" },
      maxAge: { $max: "$age" },
      count: { $sum: 1 }
  }}
]

🧪 Перевірка:
curl http://localhost:3000/users/aggregate


Очікувана відповідь:

[
  {
    "avgAge": 27.5,
    "minAge": 20,
    "maxAge": 40,
    "count": 12
  }
]

🟦 4. POST /users — Створення одного документа
🧪 Приклад:
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"name":"Alice","age":25}'

🟦 5. POST /users/many — Створення багатьох документів
🧪 Приклад:
curl -X POST http://localhost:3000/users/many \
-H "Content-Type: application/json" \
-d '[{"name":"Bob","age":30},{"name":"John","age":22}]'

🟦 6. PUT /users/:id — Оновлення одного документа
🧪 Приклад:
curl -X PUT http://localhost:3000/users/6736efd3a4fa8e1a4f790cca \
-H "Content-Type: application/json" \
-d '{"name":"Updated","age":99}'

🟦 7. PUT /users — Оновлення багатьох документів
🧪 Приклад:
curl -X PUT http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"filter":{"age":{"$gt":30}},"update":{"$set":{"vip":true}}}'

🟦 8. DELETE /users/:id — Видалення одного документа
🧪 Приклад:
curl -X DELETE http://localhost:3000/users/6736efd3a4fa8e1a4f790cca

🟦 9. DELETE /users — Видалення багатьох документів
🧪 Приклад:
curl -X DELETE http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{"age":{"$lt":18}}'

📌 Рекомендації для тестування

Після кожного запиту можеш дивитися:

📍 Логи сервера
📍 Відповіді API
📍 Статистику агрегації
📍 Роботу курсора в консолі




✔ Висновок
У цьому проєкті реалізовано:
* роботу з курсорами
* агрегацію у MongoDB
* CRUD-операції
* оптимізоване читання даних
* структуру маршрути → контролери → MongoDB driver

Проєкт готовий до розгортання або подальшої розробки.
