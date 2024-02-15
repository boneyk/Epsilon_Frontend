# Epsilon_Frontend

Фронтенд веб-приложения для системы туристического агентства для клиентов и менеджеров. 

Функционал веб-приложения имеет три уровня доступа, в зависимости от статуса пользователя - клиен, менеджер, администратор.

В данном приложении клиент имеет возможность:
* ознакомиться со списком доступных туров 
* просмотреть описание определенного тура
* добавить/удалить тур в избранном
* заказать тур
* просмотреть корзину покупок
* добавить/изменить личную информацию
* купить тур для нескольких туристов

Менеджер также имеет свою функциональную панель, на которой имеет возможность:
* подписываться на тур, который планирует курировать
* редактировать описание курируемого тура
* одобрять/отказывать заявки на покупку тура клиентов
* редактировать информацию в своем личном кабинете менеджера
* изменять фотографии тура

Администратор имеет свою личную панель, где может:
* назначать администраторов
* удалять администраторов

Приложение работает на основе rest api запросов на сервер с бэкендом.
