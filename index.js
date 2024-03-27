const jsonServer = require("json-server"); // json-server kutubxonasini import qilish
const server = jsonServer.create(); // server yaratish
const router = jsonServer.router("db.json"); // db.json faylidagi ma'lumotlarni yo'llash uchun router yaratish
const middlewares = jsonServer.defaults(); // json-server uchun o'rta middleware larini ishlatish
const port = process.env.PORT || 8080; // Portni tanlash (environment orqali yoki 8080 portidan foydalanish)

server.use(middlewares); // Middleware larini ishlatish
server.use(router); // Router ni ishlatish

// Serverni tanlangan portda eshitish
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
