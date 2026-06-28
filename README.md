# dashboard-react
Dashboard с виджетами, с использованием Webpack Module Federation. React, TS, TailWind.
Учебный проект для понимания концепции Micro Frontends, при котором одно приложение может динамически подгружать данные/компоненты из другого.

Веб-приложения делится на 3 независимых подприложения, которые запускаются на разных портах:
* Host (:8080) — основной дашборд, загружает удалённый виджет динамически
* greeting-remote (:8081) — отдельное MFE-приложение, экспонирует GreetingWidget через Module Federation
* server (:3001) — Express API с JWT-авторизацией

Виджеты:
* GreetingWidget - Загружается из greeting-remote через loadRemote(), передаётся userName
* ClockWidget	- Часы + календарь, timezone-aware через Intl.DateTimeFormat.formatToParts()
* WeatherWidget	- Текущая погода по координатам из LocationContext
* TodoWidget - Список задач на сегодня, truncate + tooltip, кастомный скроллбар
* DayProgressWidget	- Диаграмма прогресса задач (данные из TodoContext)
* ThemeWidget	- Переключатель темы (светлая/тёмная)
* LocationWidget - Выбор локации (автогеолокация или ручной поиск города)

Используемое API:
* api.open-meteo.com - Погода по координатам
* geocoding-api.open-meteo.com - Поиск городов по названию
* Nominatim (OpenStreetMap) Reverse geocoding: координаты → название города
* Кастомный Express (:3031) - Авторизация: POST /auth/login, GET /auth/me

Запуск - скрипты из package.json в корне проекта npm run start, npm run start:remote, npm run start:server.
