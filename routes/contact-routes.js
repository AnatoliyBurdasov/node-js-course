const express = require("express");
const router = express.Router();
const getContacts = require("../controllers/contacts-controller");
/*  
 express.Router() - это функция из модуля Express.js,
 которая создает новый экземпляр маршрутизатора.
 Маршрутизатор - это объект, который обрабатывает запросы
 к определенному пути и выполняет соответствующую логику. 
  */

router.get("/contacts", getContacts);

module.exports = router;
