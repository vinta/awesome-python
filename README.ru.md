<div align="center">
    <sup>Особая благодарность:</sup>
    <br>
    <a href="https://go.warp.dev/awesome-python" target="_blank">
    <img alt="Спонсорство Warp" src="https://raw.githubusercontent.com/warpdotdev/brand-assets/refs/heads/main/Github/Sponsor/Warp-Github-LG-01.png">
    </a>
    <br>
    <a href="https://go.warp.dev/awesome-python" target="_blank">Warp — терминал, созданный для кодинга с несколькими AI-агентами.</a>
</div>
<br>

# Awesome Python

Субъективный список отличных Python-фреймворков, библиотек, софта и ресурсов.

Вдохновлено [awesome-php](https://github.com/ziadoz/awesome-php).

🌐 Русский | [English](README.md)

- [Awesome Python](#awesome-python)
  - [Панели администрирования](#панели-администрирования)
  - [Алгоритмы и шаблоны проектирования](#алгоритмы-и-шаблоны-проектирования)
  - [ASGI-серверы](#asgi-серверы)
  - [Асинхронное программирование](#асинхронное-программирование)
  - [Аудио](#аудио)
  - [Аутентификация](#аутентификация)
  - [Инструменты сборки](#инструменты-сборки)
  - [Улучшение встроенных классов](#улучшение-встроенных-классов)
  - [CMS](#cms)
  - [Кэширование](#кэширование)
  - [Анализ кода](#анализ-кода)
  - [Разработка интерфейса командной строки](#разработка-интерфейса-командной-строки)
  - [Инструменты командной строки](#инструменты-командной-строки)
  - [Компьютерное зрение](#компьютерное-зрение)
  - [Конфигурационные файлы](#конфигурационные-файлы)
  - [Криптография](#криптография)
  - [Анализ данных](#анализ-данных)
  - [Валидация данных](#валидация-данных)
  - [Визуализация данных](#визуализация-данных)
  - [Базы данных](#базы-данных)
  - [Драйверы баз данных](#драйверы-баз-данных)
  - [Дата и время](#дата-и-время)
  - [Инструменты отладки](#инструменты-отладки)
  - [Глубокое обучение](#глубокое-обучение)
  - [DevOps-инструменты](#devops-инструменты)
  - [Распределённые вычисления](#распределённые-вычисления)
  - [Дистрибуция](#дистрибуция)
  - [Документация](#документация)
  - [Загрузчики](#загрузчики)
  - [Плагины редакторов и IDE](#плагины-редакторов-и-ide)
  - [Электронная почта](#электронная-почта)
  - [Управление окружением](#управление-окружением)
  - [Работа с файлами](#работа-с-файлами)
  - [Функциональное программирование](#функциональное-программирование)
  - [Разработка GUI](#разработка-gui)
  - [GraphQL](#graphql)
  - [Разработка игр](#разработка-игр)
  - [Геолокация](#геолокация)
  - [Манипуляции с HTML](#манипуляции-с-html)
  - [HTTP-клиенты](#http-клиенты)
  - [Аппаратное обеспечение](#аппаратное-обеспечение)
  - [Обработка изображений](#обработка-изображений)
  - [Реализации](#реализации)
  - [Интерактивный интерпретатор](#интерактивный-интерпретатор)
  - [Интернационализация](#интернационализация)
  - [Планировщики задач](#планировщики-задач)
  - [Логирование](#логирование)
  - [Машинное обучение](#машинное-обучение)
  - [Microsoft Windows](#microsoft-windows)
  - [Разное](#разное)
  - [Обработка естественного языка](#обработка-естественного-языка)
  - [Виртуализация сети](#виртуализация-сети)
  - [ORM](#orm)
  - [Управление пакетами](#управление-пакетами)
  - [Репозитории пакетов](#репозитории-пакетов)
  - [Тестирование на проникновение](#тестирование-на-проникновение)
  - [Права доступа](#права-доступа)
  - [Процессы](#процессы)
  - [Квантовые вычисления](#квантовые-вычисления)
  - [Рекомендательные системы](#рекомендательные-системы)
  - [Рефакторинг](#рефакторинг)
  - [RESTful API](#restful-api)
  - [Робототехника](#робототехника)
  - [RPC-серверы](#rpc-серверы)
  - [Наука](#наука)
  - [Поиск](#поиск)
  - [Сериализация](#сериализация)
  - [Serverless-фреймворки](#serverless-фреймворки)
  - [Оболочка](#оболочка)
  - [Обработка специфических форматов](#обработка-специфических-форматов)
  - [Генераторы статических сайтов](#генераторы-статических-сайтов)
  - [Очереди задач](#очереди-задач)
  - [Шаблонизаторы](#шаблонизаторы)
  - [Тестирование](#тестирование)
  - [Обработка текста](#обработка-текста)
  - [Манипуляции с URL](#манипуляции-с-url)
  - [Видео](#видео)
  - [Управление веб-ассетами](#управление-веб-ассетами)
  - [Извлечение веб-контента](#извлечение-веб-контента)
  - [Веб-краулинг](#веб-краулинг)
  - [Веб-фреймворки](#веб-фреймворки)
  - [WebSocket](#websocket)
  - [WSGI-серверы](#wsgi-серверы)
- [Ресурсы](#ресурсы)
  - [Рассылки](#рассылки)
  - [Подкасты](#подкасты)
- [Как внести вклад](#как-внести-вклад)

---

## Панели администрирования

_Библиотеки для административных интерфейсов._

- [ajenti](https://github.com/ajenti/ajenti) - Панель администрирования, которую заслуживают ваши серверы.
- [django-grappelli](https://github.com/sehmaschine/django-grappelli) - Стильная «оболочка» для административного интерфейса Django.
- [django-unfold](https://github.com/unfoldadmin/django-unfold) - Обновите админку Django современным эффектным интерфейсом, мощными возможностями и цельным пользовательским опытом.
- [flask-admin](https://github.com/flask-admin/flask-admin) - Простой и расширяемый фреймворк административного интерфейса для Flask.
- [flower](https://github.com/mher/flower) - Мониторинг в реальном времени и веб-админка для Celery.
- [func-to-web](https://github.com/offerrall/FuncToWeb) - Мгновенно создавайте веб-интерфейсы из Python-функций с помощью аннотаций типов. Без фронтенд-кода.
- [jet-bridge](https://github.com/jet-admin/jet-bridge) - Фреймворк админ-панели для любого приложения с приятным UI (бывший Jet Django).
- [streamlit](https://github.com/streamlit/streamlit) - Фреймворк, который позволяет за минуты собирать дашборды, отчёты или чат-приложения.
- [wooey](https://github.com/wooey/wooey) - Django-приложение, которое автоматически создаёт веб-интерфейсы для Python-скриптов.

## Алгоритмы и шаблоны проектирования

_Реализации структур данных, алгоритмов и шаблонов проектирования на Python. Также см. [awesome-algorithms](https://github.com/tayllan/awesome-algorithms)._

- Алгоритмы
  - [algorithms](https://github.com/keon/algorithms) - Минимальные примеры структур данных и алгоритмов.
  - [python-ds](https://github.com/prabhupant/python-ds) - Подборка структур данных и алгоритмов для собеседований.
  - [sortedcontainers](https://github.com/grantjenks/python-sortedcontainers) - Быстрая и «чисто Python» реализация отсортированных коллекций.
  - [thealgorithms](https://github.com/TheAlgorithms/Python) - Все алгоритмы, реализованные на Python.
- Шаблоны проектирования
  - [python-cqrs](https://github.com/vadikko2/python-cqrs) - Фреймворк событийно-ориентированной архитектуры с CQRS/CQS, Transaction Outbox и оркестрацией Saga.
  - [python-patterns](https://github.com/faif/python-patterns) - Подборка шаблонов проектирования на Python.
  - [transitions](https://github.com/pytransitions/transitions) - Лёгкая объектно-ориентированная реализация конечного автомата.

## ASGI-серверы

_Веб-серверы, совместимые с [ASGI](https://asgi.readthedocs.io/en/latest/)._

- [daphne](https://github.com/django/daphne) - Сервер протоколов HTTP, HTTP2 и WebSocket для ASGI и ASGI-HTTP.
- [granian](https://github.com/emmett-framework/granian) - HTTP-сервер на Rust для Python-приложений поверх Hyper и Tokio, с поддержкой WSGI/ASGI/RSGI.
- [hypercorn](https://github.com/pgjones/hypercorn) - ASGI- и WSGI-сервер на базе библиотек Hyper, вдохновлённый Gunicorn.
- [uvicorn](https://github.com/encode/uvicorn) - Молниеносная реализация ASGI-сервера на базе uvloop и httptools.

## Асинхронное программирование

_Библиотеки для асинхронного, конкурентного и параллельного выполнения. Также см. [awesome-asyncio](https://github.com/timofurrer/awesome-asyncio)._

- [asyncio](https://docs.python.org/3/library/asyncio.html) - (Стандартная библиотека Python) Асинхронный ввод-вывод, цикл событий, корутины и задачи.
  - [awesome-asyncio](https://github.com/timofurrer/awesome-asyncio)
- [concurrent.futures](https://docs.python.org/3/library/concurrent.futures.html) - (Стандартная библиотека Python) Высокоуровневый интерфейс для асинхронного выполнения вызываемых объектов.
- [gevent](https://github.com/gevent/gevent) - Сетевая библиотека на Python на основе корутин, использующая [greenlet](https://github.com/python-greenlet/greenlet).
- [multiprocessing](https://docs.python.org/3/library/multiprocessing.html) - (Стандартная библиотека Python) Параллелизм на основе процессов.
- [trio](https://github.com/python-trio/trio) - Дружелюбная библиотека для асинхронной конкурентности и ввода-вывода.
- [twisted](https://github.com/twisted/twisted) - Событийно-ориентированный сетевой движок.
- [uvloop](https://github.com/MagicStack/uvloop) - Очень быстрый цикл событий asyncio.

## Аудио

_Библиотеки для работы со звуком и его метаданными._

- Аудио
  - [audioFlux](https://github.com/libAudioFlux/audioFlux) - Библиотека для анализа аудио и музыки, извлечения признаков.
  - [audioread](https://github.com/beetbox/audioread) - Декодирование аудио через разные бэкенды (GStreamer + Core Audio + MAD + FFmpeg).
  - [dejavu](https://github.com/worldveil/dejavu) - Аудио-«отпечатки» и распознавание.
  - [gTTS](https://github.com/pndurette/gTTS) - Библиотека и CLI-инструмент для преобразования текста в речь с помощью Google Translate TTS.
  - [kapre](https://github.com/keunwoochoi/kapre) - Аудио-препроцессоры для Keras.
  - [librosa](https://github.com/librosa/librosa) - Библиотека для анализа аудио и музыки на Python.
  - [matchering](https://github.com/sergree/matchering) - Библиотека для автоматизированного мастеринга по референсу.
  - [mingus](http://bspaans.github.io/python-mingus/) - Продвинутый пакет по теории музыки и нотной записи с поддержкой MIDI-файлов и воспроизведения.
  - [pyaudioanalysis](https://github.com/tyiannak/pyAudioAnalysis) - Извлечение аудио-признаков, классификация, сегментация и прикладные сценарии.
  - [pydub](https://github.com/jiaaro/pydub) - Манипулирование аудио через простой и удобный высокоуровневый интерфейс.
  - [timeside](https://github.com/Parisson/TimeSide) - Открытый фреймворк веб-обработки аудио.
- Метаданные
  - [beets](https://github.com/beetbox/beets) - Менеджер музыкальной библиотеки и теггер [MusicBrainz](https://musicbrainz.org/).
  - [eyed3](https://github.com/nicfit/eyeD3) - Инструмент для работы с аудиофайлами, в частности с MP3-файлами, содержащими ID3-метаданные.
  - [mutagen](https://github.com/quodlibet/mutagen) - Python-модуль для обработки метаданных аудио.
  - [tinytag](https://github.com/devsnd/tinytag) - Библиотека для чтения метаданных MP3, OGG, FLAC и Wave.

## Аутентификация

_Библиотеки для реализации схем аутентификации._

- OAuth
  - [authlib](https://github.com/lepture/authlib) - Реализация черновика JavaScript Object Signing and Encryption.
  - [django-allauth](https://github.com/pennersr/django-allauth) - Приложение аутентификации для Django, которое «просто работает».
  - [django-oauth-toolkit](https://github.com/jazzband/django-oauth-toolkit) - Полезности для OAuth 2 в Django.
  - [oauthlib](https://github.com/oauthlib/oauthlib) - Универсальная и тщательно проработанная реализация логики подписи OAuth-запросов.
- JWT
  - [pyjwt](https://github.com/jpadilla/pyjwt) - Реализация JSON Web Token на Python.
  - [python-jose](https://github.com/mpdavis/python-jose/) - Реализация JOSE на Python.

## Инструменты сборки

_Сборка программ из исходного кода._

- [bitbake](https://github.com/openembedded/bitbake) - Инструмент сборки, похожий на make, для встраиваемого Linux.
- [buildout](https://github.com/buildout/buildout) - Система сборки для создания, сборки и развёртывания приложений из нескольких частей.
- [platformio](https://github.com/platformio/platformio-core) - Консольный инструмент для сборки кода под разные платформы разработки.
- [pybuilder](https://github.com/pybuilder/pybuilder) - Инструмент непрерывной сборки, написанный на чистом Python.
- [scons](https://github.com/SCons/scons) - Инструмент для сборки программного обеспечения.

## Улучшение встроенных классов

_Библиотеки для расширения встроенных классов Python._

- [attrs](https://github.com/python-attrs/attrs) - Замена «шаблонного» кода `__init__`, `__eq__`, `__repr__` и т. п. в определениях классов.
- [bidict](https://github.com/jab/bidict) - Эффективные двунаправленные отображения и связанная функциональность в «питоничном» стиле.
- [box](https://github.com/cdgriffith/Box) - Python-словари с расширенным доступом через точечную нотацию.
- [dataclasses](https://docs.python.org/3/library/dataclasses.html) - (Стандартная библиотека Python) Классы данных.
- [dotteddict](https://github.com/carlosescri/DottedDict) - Библиотека, предоставляющая доступ к спискам и словарям через «путь» в точечной нотации.

## CMS

_Системы управления контентом._

- [feincms](https://github.com/feincms/feincms) - Одна из самых продвинутых CMS, построенных на Django.
- [indico](https://github.com/indico/indico) - Функциональная система управления событиями, созданная в [CERN](https://en.wikipedia.org/wiki/CERN).
- [wagtail](https://github.com/wagtail/wagtail) - CMS на Django.

## Кэширование

_Библиотеки для кэширования данных._

- [beaker](https://github.com/bbangert/beaker) - WSGI-middleware для сессий и кэширования.
- [django-cache-machine](https://github.com/django-cache-machine/django-cache-machine) - Автоматическое кэширование и инвалидирование для моделей Django.
- [django-cacheops](https://github.com/Suor/django-cacheops) - Аккуратный ORM-кэш с автоматическим детальным событийно-ориентированным инвалидированием.
- [dogpile.cache](https://github.com/sqlalchemy/dogpile.cache) - dogpile.cache — следующее поколение замены Beaker от тех же авторов.
- [hermescache](https://pypi.org/project/HermesCache/) - Библиотека кэширования для Python с инвалидированием по тегам и защитой от эффекта dogpile.
- [pylibmc](https://github.com/lericson/pylibmc) - Python-обёртка над интерфейсом [libmemcached](https://libmemcached.org/libMemcached.html).
- [python-diskcache](https://github.com/grantjenks/python-diskcache) - Кэш на базе SQLite и файлов с более быстрыми запросами, чем у memcached и redis.

## Анализ кода

_Инструменты статического анализа, линтеры и проверки качества кода. Также см. [awesome-static-analysis](https://github.com/mre/awesome-static-analysis)._

- Анализ кода
  - [code2flow](https://github.com/scottrogowski/code2flow) - Превращает ваш код на Python и JavaScript в блок-схемы DOT.
  - [prospector](https://github.com/PyCQA/prospector) - Инструмент для анализа кода Python.
  - [vulture](https://github.com/jendrikseipp/vulture) - Инструмент для поиска и анализа «мёртвого» Python-кода.
- Линтеры
  - [flake8](https://github.com/PyCQA/flake8) - Обёртка над `pycodestyle`, `pyflakes` и McCabe.
    - [awesome-flake8-extensions](https://github.com/DmytroLitvinov/awesome-flake8-extensions)
  - [pylint](https://github.com/pylint-dev/pylint) - Полностью настраиваемый анализатор исходного кода.
  - [ruff](https://github.com/astral-sh/ruff) - Очень быстрый Python-линтер и форматтер кода.
- Форматтеры кода
  - [black](https://github.com/psf/black) - Бескомпромиссный форматтер Python-кода.
  - [isort](https://github.com/timothycrosley/isort) - Утилита/библиотека для сортировки импортов.
  - [yapf](https://github.com/google/yapf) - Ещё один форматтер Python-кода от Google.
- Статические проверщики типов; также см. [awesome-python-typing](https://github.com/typeddjango/awesome-python-typing)
  - [mypy](https://github.com/python/mypy) - Проверка типов переменных на этапе компиляции.
  - [pyre-check](https://github.com/facebook/pyre-check) - Производительная проверка типов.
  - [ty](https://github.com/astral-sh/ty) - Очень быстрый проверщик типов и language server для Python.
  - [typeshed](https://github.com/python/typeshed) - Коллекция заглушек библиотек для Python со статическими типами.
- Генераторы аннотаций типов
  - [monkeytype](https://github.com/Instagram/MonkeyType) - Система для Python, генерирующая статические аннотации типов, собирая типы во время выполнения.
  - [pytype](https://github.com/google/pytype) - Pytype проверяет и выводит типы для Python-кода без обязательных аннотаций типов.

## Разработка интерфейса командной строки

_Библиотеки для создания приложений командной строки._

- Разработка приложений командной строки
  - [argparse](https://docs.python.org/3/library/argparse.html) - (Стандартная библиотека Python) Разбор опций и аргументов командной строки.
  - [cement](https://github.com/datafolklabs/cement) - CLI-фреймворк для Python.
  - [click](https://github.com/pallets/click/) - Пакет для создания красивых интерфейсов командной строки в компонуемом стиле.
  - [cliff](https://github.com/openstack/cliff) - Фреймворк для создания CLI-программ с многоуровневыми командами.
  - [python-fire](https://github.com/google/python-fire) - Библиотека для создания CLI буквально из любого Python-объекта.
  - [python-prompt-toolkit](https://github.com/prompt-toolkit/python-prompt-toolkit) - Библиотека для построения мощных интерактивных командных строк.
  - [Typer](https://github.com/tiangolo/typer) - Современный CLI-фреймворк на аннотациях типов Python. Построен на Click и Pydantic.
- Рендеринг в терминале
  - [alive-progress](https://github.com/rsalmei/alive-progress) - Новый тип прогресс-бара с метриками в реальном времени, ETA и очень крутыми анимациями.
  - [asciimatics](https://github.com/peterbrittain/asciimatics) - Пакет для создания полноэкранных текстовых интерфейсов (от интерактивных форм до ASCII-анимаций).
  - [bashplotlib](https://github.com/glamp/bashplotlib) - Построение простых графиков прямо в терминале.
  - [colorama](https://github.com/tartley/colorama) - Кроссплатформенный цветной текст в терминале.
  - [rich](https://github.com/Textualize/rich) - Библиотека для «богатого» текста и красивого форматирования в терминале. Также даёт отличный лог-хендлер `RichHandler`.
  - [textual](https://github.com/Textualize/textual) - Фреймворк для интерактивных интерфейсов, которые работают в терминале и в браузере.
  - [tqdm](https://github.com/tqdm/tqdm) - Быстрый и расширяемый прогресс-бар для циклов и CLI.

## Инструменты командной строки

_Полезные CLI-инструменты для повышения продуктивности._

- Инструменты продуктивности
  - [ccb](https://github.com/bfly123/claude_code_bridge) - CLI-инструмент для оркестрации нескольких LLM (Claude, Gemini и т. п.) в панелях Tmux с взаимодействием между агентами.
  - [cookiecutter](https://github.com/cookiecutter/cookiecutter) - Утилита командной строки, создающая проекты из cookiecutters (шаблонов проектов).
  - [copier](https://github.com/copier-org/copier) - Библиотека и CLI-утилита для рендеринга шаблонов проектов.
  - [doitlive](https://github.com/sloria/doitlive) - Инструмент для живых презентаций в терминале.
  - [howdoi](https://github.com/gleitz/howdoi) - Мгновенные ответы по программированию из командной строки.
  - [invoke](https://github.com/pyinvoke/invoke) - Инструмент для управления shell-ориентированными подпроцессами и организации исполняемого Python-кода в задачи, вызываемые из CLI.
  - [pathpicker](https://github.com/facebook/PathPicker) - Выбор файлов из вывода bash.
  - [thefuck](https://github.com/nvbn/thefuck) - Исправляет предыдущую команду в консоли.
  - [tmuxp](https://github.com/tmux-python/tmuxp) - Менеджер сессий [tmux](https://github.com/tmux/tmux).
  - [try](https://github.com/timofurrer/try) - Очень простой CLI, чтобы «потрогать» python-пакеты — ещё никогда не было так легко.
- Улучшения CLI
  - [httpie](https://github.com/httpie/cli) - HTTP-клиент командной строки, удобная замена cURL.
  - [iredis](https://github.com/laixintao/iredis) - Redis CLI с автодополнением и подсветкой синтаксиса.
  - [litecli](https://github.com/dbcli/litecli) - SQLite CLI с автодополнением и подсветкой синтаксиса.
  - [mycli](https://github.com/dbcli/mycli) - MySQL CLI с автодополнением и подсветкой синтаксиса.
  - [pgcli](https://github.com/dbcli/pgcli) - PostgreSQL CLI с автодополнением и подсветкой синтаксиса.

## Компьютерное зрение

_Библиотеки для компьютерного зрения._

- [easyocr](https://github.com/JaidedAI/EasyOCR) - Готовый к использованию OCR с поддержкой 40+ языков.
- [kornia](https://github.com/kornia/kornia/) - Открытая дифференцируемая библиотека компьютерного зрения для PyTorch.
- [opencv](https://opencv.org/) - Открытая библиотека компьютерного зрения.
- [pytesseract](https://github.com/madmaze/pytesseract) - Обёртка для [Google Tesseract OCR](https://github.com/tesseract-ocr).
- [tesserocr](https://github.com/sirfz/tesserocr) - Ещё одна простая Pillow-дружественная обёртка над API `tesseract-ocr` для OCR.

## Конфигурационные файлы

_Библиотеки для хранения и разбора параметров конфигурации._

- [configobj](https://github.com/DiffSK/configobj) - Парсер INI-файлов с валидацией.
- [configparser](https://docs.python.org/3/library/configparser.html) - (Стандартная библиотека Python) Парсер INI-файлов.
- [dynaconf](https://github.com/dynaconf/dynaconf) - Dynaconf — менеджер конфигурации с плагинами для Django, Flask и FastAPI.
- [hydra](https://github.com/facebookresearch/hydra) - Hydra — фреймворк для элегантной конфигурации сложных приложений.
- [python-decouple](https://github.com/HBNetwork/python-decouple) - Строгое отделение настроек от кода.

## Криптография

- [cryptography](https://github.com/pyca/cryptography) - Пакет, созданный для предоставления криптографических примитивов и «рецептов» разработчикам на Python.
- [paramiko](https://github.com/paramiko/paramiko) - Ведущая нативная Python-библиотека протокола SSHv2.
- [pynacl](https://github.com/pyca/pynacl) - Python-привязки к библиотеке Networking and Cryptography (NaCl).

## Анализ данных

_Библиотеки для анализа данных._

- [aws-sdk-pandas](https://github.com/aws/aws-sdk-pandas) - Pandas на AWS.
- [datasette](https://github.com/simonw/datasette) - Open source мульти-инструмент для исследования и публикации данных.
- [desbordante](https://github.com/desbordante/desbordante-core/) - Open source профайлер данных для поиска сложных закономерностей.
- [docling](https://github.com/docling-project/docling) - Библиотека для преобразования документов в структурированные данные.
- [optimus](https://github.com/hi-primus/optimus) - Гибкие процессы Data Science на PySpark.
- [pandas](https://pandas.pydata.org/) - Библиотека высокопроизводительных и удобных структур данных и инструментов анализа данных.
- [pathway](https://github.com/pathwaycom/pathway) - Фреймворк обработки данных в реальном времени для Python с реактивными dataflow.
- [polars](https://github.com/pola-rs/polars) - Быстрая библиотека DataFrame, реализованная на Rust, с Python API.

## Валидация данных

_Библиотеки для валидации данных. Во многих случаях используются для форм._

- [cerberus](https://github.com/pyeve/cerberus) - Лёгкая и расширяемая библиотека валидации данных.
- [colander](https://github.com/Pylons/colander) - Валидация и десериализация данных, полученных через XML, JSON, HTML-формы.
- [jsonschema](https://github.com/python-jsonschema/jsonschema) - Реализация [JSON Schema](http://json-schema.org/) для Python.
- [pydantic](https://github.com/pydantic/pydantic) - Валидация данных с использованием аннотаций типов Python.
- [schema](https://github.com/keleshev/schema) - Библиотека для валидации структур данных Python.
- [schematics](https://github.com/schematics/schematics) - Валидация структур данных.
- [voluptuous](https://github.com/alecthomas/voluptuous) - Библиотека валидации данных на Python.

## Визуализация данных

_Библиотеки для визуализации данных. Также см. [awesome-javascript](https://github.com/sorrycc/awesome-javascript#data-visualization)._

- [altair](https://github.com/altair-viz/altair) - Декларативная библиотека статистической визуализации для Python.
- [bokeh](https://github.com/bokeh/bokeh) - Интерактивные веб-графики на Python.
- [bqplot](https://github.com/bloomberg/bqplot) - Библиотека интерактивной визуализации для Jupyter Notebook.
- [cartopy](https://github.com/SciTools/cartopy) - Картографическая библиотека на Python с поддержкой matplotlib.
- [diagrams](https://github.com/mingrammer/diagrams) - Диаграммы как код.
- [matplotlib](https://github.com/matplotlib/matplotlib) - Python-библиотека для 2D-графиков.
- [plotly](https://github.com/plotly/plotly.py) - Интерактивная библиотека графиков для Python.
- [plotnine](https://github.com/has2k1/plotnine) - «Грамматика графики» для Python на основе ggplot2.
- [pygal](https://github.com/Kozea/pygal) - Генератор SVG-диаграмм на Python.
- [pygraphviz](https://github.com/pygraphviz/pygraphviz/) - Python-интерфейс для [Graphviz](http://www.graphviz.org/).
- [pyqtgraph](https://github.com/pyqtgraph/pyqtgraph) - Интерактивная 2D/3D/графическая визуализация в реальном времени и виджеты для науки/инженерии.
- [seaborn](https://github.com/mwaskom/seaborn) - Статистическая визуализация данных на базе Matplotlib.
- [UltraPlot](https://github.com/ultraplot/UltraPlot) - Обёртка над Matplotlib для научных иллюстраций «как для публикации» с минимумом кода. Включает продвинутое управление subplot, компоновкой панелей и geoscience-графикой «из коробки».
- [vispy](https://github.com/vispy/vispy) - Высокопроизводительная научная визуализация на базе OpenGL.

## Базы данных

_Базы данных, реализованные на Python._

- [DuckDB](https://duckdb.org/) - Встраиваемая SQL OLAP СУБД; оптимизирована для аналитики и быстрых запросов, похожа на SQLite, но для аналитических нагрузок.
- [pickleDB](https://github.com/patx/pickledb) - Простое и лёгкое key-value хранилище для Python.
- [tinydb](https://github.com/msiemens/tinydb) - Крошечная документо-ориентированная база данных.
- [zodb](https://github.com/zopefoundation/ZODB) - Нативная объектная база данных для Python. Key-value и object graph база данных.

## Драйверы баз данных

_Библиотеки для подключения к базам данных и работы с ними._

- MySQL - [awesome-mysql](http://shlomi-noach.github.io/awesome-mysql/)
  - [mysqlclient](https://github.com/PyMySQL/mysqlclient) - MySQL-коннектор с поддержкой Python 3 (форк [mysql-python](https://sourceforge.net/projects/mysql-python/)).
  - [pymysql](https://github.com/PyMySQL/PyMySQL) - «Чисто Python» драйвер MySQL, совместимый с mysql-python.
- PostgreSQL - [awesome-postgres](https://github.com/dhamaniasad/awesome-postgres)
  - [psycopg](https://github.com/psycopg/psycopg) - Самый популярный адаптер PostgreSQL для Python.
- SQlite - [awesome-sqlite](https://github.com/planetopendata/awesome-sqlite)
  - [sqlite-utils](https://github.com/simonw/sqlite-utils) - CLI-утилита и библиотека Python для манипулирования SQLite-базами.
  - [sqlite3](https://docs.python.org/3/library/sqlite3.html) - (Стандартная библиотека Python) Интерфейс SQlite, совместимый с DB-API 2.0.
- Другие реляционные базы данных
  - [clickhouse-driver](https://github.com/mymarilyn/clickhouse-driver) - Драйвер Python с нативным интерфейсом для ClickHouse.
  - [pymssql](https://github.com/pymssql/pymssql) - Простой интерфейс к Microsoft SQL Server.
- NoSQL-базы данных
  - [cassandra-driver](https://github.com/datastax/python-driver) - Python-драйвер для Apache Cassandra.
  - [Django MongoDB Backend](https://github.com/mongodb/django-mongodb-backend) - Официальный MongoDB-бэкенд базы данных для Django.
  - [kafka-python](https://github.com/dpkp/kafka-python) - Python-клиент для Apache Kafka.
  - [pymongo](https://github.com/mongodb/mongo-python-driver) - Официальный Python-клиент для MongoDB.
  - [redis-py](https://github.com/redis/redis-py) - Python-клиент для Redis.
  - [Beanie](https://github.com/BeanieODM/beanie) - Асинхронный object-document mapper (ODM) для MongoDB.

## Дата и время

_Библиотеки для работы с датой и временем._

- [arrow](https://github.com/arrow-py/arrow) - Библиотека, предлагающая удобный и «человечный» подход к созданию, изменению, форматированию и преобразованию дат, времени и временных меток.
- [dateutil](https://github.com/dateutil/dateutil) - Расширения стандартного модуля Python [datetime](https://docs.python.org/3/library/datetime.html).
- [pendulum](https://github.com/sdispater/pendulum) - Python-datetime без боли.
- [pytz](https://pypi.org/project/pytz/) - Определения часовых поясов мира — современные и исторические. Приносит в Python [tz database](https://en.wikipedia.org/wiki/Tz_database).

## Инструменты отладки

_Библиотеки для отладки кода._

- Отладчики в стиле pdb
  - [ipdb](https://github.com/gotcha/ipdb) - [pdb](https://docs.python.org/3/library/pdb.html) с поддержкой IPython.
  - [pudb](https://github.com/inducer/pudb) - Полноэкранный консольный отладчик Python.
- Трассировка
  - [manhole](https://github.com/ionelmc/python-manhole) - Отладка соединений UNIX socket, вывод stacktrace для всех потоков и интерактивная консоль.
  - [python-hunter](https://github.com/ionelmc/python-hunter) - Гибкий набор инструментов трассировки кода.
- Профилирование
  - [py-spy](https://github.com/benfred/py-spy) - Сэмплирующий профайлер для Python-программ. Написан на Rust.
  - [vprof](https://github.com/nvdv/vprof) - Визуальный профайлер Python.
- Прочее
  - [django-debug-toolbar](https://github.com/jazzband/django-debug-toolbar) - Показывает различную отладочную информацию для Django.
  - [flask-debugtoolbar](https://github.com/pallets-eco/flask-debugtoolbar) - Порт django-debug-toolbar для flask.
  - [icecream](https://github.com/gruns/icecream) - Инспектирование переменных, выражений и выполнения программы одной простой функцией.
  - [memory-graph](https://github.com/bterwijn/memory_graph) - Визуализирует данные Python во время выполнения, чтобы отлаживать ссылки, изменяемость и aliasing.
  - [pyelftools](https://github.com/eliben/pyelftools) - Разбор и анализ ELF-файлов и отладочной информации DWARF.

## Глубокое обучение

_Фреймворки для нейросетей и глубокого обучения. Также см. [awesome-deep-learning](https://github.com/ChristosChristofidis/awesome-deep-learning)._

- [jax](https://github.com/google/jax) - библиотека для высокопроизводительных численных вычислений с автодифференцированием и JIT-компиляцией.
- [keras](https://github.com/keras-team/keras) - Высокоуровневая библиотека нейросетей, способная работать поверх TensorFlow или Theano.
- [pytorch-lightning](https://github.com/Lightning-AI/pytorch-lightning) - Фреймворк глубокого обучения для обучения, развёртывания и быстрой доставки AI-продуктов.
- [pytorch](https://github.com/pytorch/pytorch) - Тензоры и динамические нейросети на Python с мощным ускорением на GPU.
- [stable-baselines3](https://github.com/DLR-RM/stable-baselines3) - Реализации PyTorch алгоритмов Stable Baselines для (глубокого) обучения с подкреплением.
- [tensorflow](https://github.com/tensorflow/tensorflow) - Самый популярный фреймворк глубокого обучения от Google.
- [vllm](https://github.com/vllm-project/vllm) - Высокопроизводительный и экономный по памяти движок инференса и сервинга LLM.

## DevOps-инструменты

_Софт и библиотеки для DevOps._

- Облачные провайдеры
  - [boto3](https://github.com/boto/boto3) - Python-интерфейс к Amazon Web Services.
- Управление конфигурацией
  - [ansible](https://github.com/ansible/ansible) - Радикально простая платформа IT-автоматизации.
  - [cloudinit](https://github.com/canonical/cloud-init) - Пакет для разных дистрибутивов, выполняющий раннюю инициализацию облачного инстанса.
  - [openstack](https://www.openstack.org/) - Open source софт для построения частных и публичных облаков.
  - [pyinfra](https://github.com/pyinfra-dev/pyinfra) - Универсальные CLI-инструменты и python-библиотеки для автоматизации инфраструктуры.
  - [saltstack](https://github.com/saltstack/salt) - Система автоматизации и управления инфраструктурой.
- Деплой «в стиле SSH»
  - [cuisine](https://github.com/sebastien/cuisine) - Функциональность в стиле Chef для Fabric.
  - [fabric](https://github.com/fabric/fabric) - Простой «питоничный» инструмент для удалённого выполнения команд и деплоя.
- Управление процессами
  - [supervisor](https://github.com/Supervisor/supervisor) - Система контроля процессов Supervisor для UNIX.
- Мониторинг
  - [psutil](https://github.com/giampaolo/psutil) - Кроссплатформенный модуль утилит для процессов и системы.
- Резервное копирование
  - [borg](https://github.com/borgbackup/borg) - Дедуплицирующий архиватор со сжатием и шифрованием.
- Хаос-инжиниринг
  - [chaostoolkit](https://github.com/chaostoolkit/chaostoolkit) - Набор инструментов хаос-инжиниринга и оркестрации для разработчиков.

## Распределённые вычисления

_Фреймворки и библиотеки для распределённых вычислений._

- Пакетная обработка
  - [dask](https://github.com/dask/dask) - Гибкая библиотека параллельных вычислений для аналитических задач.
  - [luigi](https://github.com/spotify/luigi) - Модуль, который помогает строить сложные пайплайны пакетных джоб.
  - [mpi4py](https://github.com/mpi4py/mpi4py) - Python-привязки для MPI.
  - [PySpark](https://github.com/apache/spark) - Python API для [Apache Spark](https://spark.apache.org/).
  - [Ray](https://github.com/ray-project/ray/) - Система для параллельного и распределённого Python, объединяющая экосистему машинного обучения.
- Потоковая обработка
  - [streamparse](https://github.com/Parsely/streamparse) - Запуск Python-кода на потоках данных в реальном времени через [Apache Storm](http://storm.apache.org/).

## Дистрибуция

_Библиотеки для создания упакованных исполняемых файлов для релизной поставки._

- [cx_freeze](https://github.com/marcelotduarte/cx_Freeze) - Инструмент, который превращает Python-скрипты в автономные исполняемые файлы и инсталляторы для Windows, macOS и Linux.
- [Nuitka](https://github.com/Nuitka/Nuitka) - Компилирует Python-программы в высокопроизводительные автономные исполняемые файлы (кроссплатформенно, поддерживает все версии Python).
- [py2app](https://github.com/ronaldoussoren/py2app) - «Замораживает» Python-скрипты (Mac OS X).
- [py2exe](https://github.com/py2exe/py2exe) - «Замораживает» Python-скрипты (Windows).
- [pyarmor](https://github.com/dashingsoft/pyarmor) - Инструмент для обфускации python-скриптов, привязки обфусцированных скриптов к машине или задания срока действия.
- [pyinstaller](https://github.com/pyinstaller/pyinstaller) - Превращает Python-программы в автономные исполняемые файлы (кроссплатформенно).
- [shiv](https://github.com/linkedin/shiv) - CLI-утилита для сборки полностью самодостаточных zipapps (PEP 441) вместе со всеми зависимостями.

## Документация

_Библиотеки для генерации проектной документации._

- [sphinx](https://github.com/sphinx-doc/sphinx/) - Генератор документации для Python.
  - [awesome-sphinxdoc](https://github.com/yoloseem/awesome-sphinxdoc)
- [pdoc](https://github.com/mitmproxy/pdoc) - Замена Epydoc для автогенерации API-документации Python-библиотек.

## Загрузчики

_Библиотеки для скачивания._

- [akshare](https://github.com/jindaxiang/akshare) - Библиотека интерфейсов к финансовым данным, созданная для людей!
- [edgartools](https://github.com/dgunning/edgartools) - Библиотека для скачивания структурированных данных из отчётности SEC EDGAR и финансовых отчётов XBRL.
- [OpenBB](https://github.com/OpenBB-finance/OpenBB) - Платформа финансовых данных для аналитиков, квантов и AI-агентов.
- [s3cmd](https://github.com/s3tools/s3cmd) - CLI-инструмент для управления Amazon S3 и CloudFront.
- [yfinance](https://github.com/ranaroussi/yfinance) - Простой «питоничный» способ скачивать рыночные и финансовые данные из Yahoo Finance.
- [youtube-dl](https://github.com/ytdl-org/youtube-dl/) - CLI-программа для скачивания видео с YouTube и других видеосайтов.

## Плагины редакторов и IDE

- Emacs
  - [elpy](https://github.com/jorgenschaefer/elpy) - Среда разработки Python для Emacs.
- Vim
  - [jedi-vim](https://github.com/davidhalter/jedi-vim) - Vim-привязки для библиотеки автодополнения Jedi для Python.
  - [python-mode](https://github.com/python-mode/python-mode) - Плагин «всё в одном», превращающий Vim в Python IDE.
  - [YouCompleteMe](https://github.com/Valloric/YouCompleteMe) - Включает движок автодополнения для Python на базе [Jedi](https://github.com/davidhalter/jedi).
- Visual Studio
  - [PTVS](https://github.com/Microsoft/PTVS) - Инструменты Python для Visual Studio.
- Visual Studio Code
  - [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) - Официальное расширение VSCode с богатой поддержкой Python.
- IDE
  - [PyCharm](https://www.jetbrains.com/pycharm/) - Коммерческая Python IDE от JetBrains. Доступна бесплатная Community Edition.
  - [spyder](https://github.com/spyder-ide/spyder) - Open Source Python IDE.

## Электронная почта

_Библиотеки для отправки и разбора электронной почты._

- Почтовые серверы
  - [modoboa](https://github.com/modoboa/modoboa) - Платформа хостинга и управления почтой, включающая современный веб-интерфейс.
- Клиенты
  - [imbox](https://github.com/martinrusev/imbox) - Python IMAP для людей.
  - [yagmail](https://github.com/kootenpv/yagmail) - Ещё один Gmail/SMTP-клиент.
- Прочее
  - [flanker](https://github.com/mailgun/flanker) - Библиотека разбора email-адресов и MIME.
  - [mailer](https://github.com/marrow/mailer) - Высокопроизводительный расширяемый фреймворк доставки почты.

## Управление окружением

_Библиотеки для управления версиями Python и виртуальными окружениями._

- [pyenv](https://github.com/pyenv/pyenv) - Простое управление версиями Python.
- [pyenv-win](https://github.com/pyenv-win/pyenv-win) - Pyenv для Windows, простое управление версиями Python.
- [uv](https://github.com/astral-sh/uv) - Очень быстрый менеджер пакетов и проектов Python, написанный на Rust.
- [virtualenv](https://github.com/pypa/virtualenv) - Инструмент для создания изолированных Python-окружений.

## Работа с файлами

_Библиотеки для работы с файлами._

- [markitdown](https://github.com/microsoft/markitdown) - Python-инструмент для конвертации файлов и офисных документов в Markdown.
- [mimetypes](https://docs.python.org/3/library/mimetypes.html) - (Стандартная библиотека Python) Сопоставление имён файлов с MIME-типами.
- [path.py](https://github.com/jaraco/path.py) - Обёртка-модуль для [os.path](https://docs.python.org/3/library/os.path.html).
- [pathlib](https://docs.python.org/3/library/pathlib.html) - (Стандартная библиотека Python) Кроссплатформенная объектно-ориентированная библиотека путей.
- [python-magic](https://github.com/ahupp/python-magic) - Python-интерфейс к библиотеке определения типов файлов libmagic.
- [watchdog](https://github.com/gorakhargosh/watchdog) - API и shell-утилиты для мониторинга событий файловой системы.
- [watchfiles](https://github.com/samuelcolvin/watchfiles) - Простое, современное и быстрое наблюдение за файлами и перезагрузка кода на Python.

## Функциональное программирование

_Функциональное программирование на Python._

- [coconut](https://github.com/evhub/coconut) - Вариант Python, созданный для простого, элегантного и «питоничного» функционального программирования.
- [cytoolz](https://github.com/pytoolz/cytoolz/) - Реализация `Toolz` на Cython: высокопроизводительные функциональные утилиты.
- [functools](https://docs.python.org/3/library/functools.html) - (Стандартная библиотека Python) Функции высшего порядка и операции над вызываемыми объектами.
- [funcy](https://github.com/Suor/funcy) - Элегантные и практичные функциональные инструменты.
- [more-itertools](https://github.com/erikrose/more-itertools) - Дополнительные функции для работы с итераторами, сверх `itertools`.
- [returns](https://github.com/dry-python/returns) - Набор типобезопасных монад, трансформеров и утилит композиции.
- [toolz](https://github.com/pytoolz/toolz) - Коллекция функциональных утилит для итераторов, функций и словарей.

## Разработка GUI

_Библиотеки для работы с приложениями с графическим интерфейсом._

- [curses](https://docs.python.org/3/library/curses.html) - Встроенная обёртка над [ncurses](http://www.gnu.org/software/ncurses/), используемая для создания терминальных GUI-приложений.
- [CustomTkinter](https://github.com/tomschimansky/customtkinter) - Современная и настраиваемая Python UI-библиотека на базе Tkinter.
- [DearPyGui](https://github.com/RaylockLLC/DearPyGui/) - Простой GUI-фреймворк Python с GPU-ускорением
- [enaml](https://github.com/nucleic/enaml) - Создание красивых интерфейсов с декларативным синтаксисом, как в QML.
- [Flet](https://flet.dev) - Кроссплатформенный GUI-фреймворк для создания современных приложений на чистом Python.
- [Flexx](https://github.com/zoofIO/flexx) - Инструментарий на чистом Python для создания GUI, использующий веб-технологии для рендеринга.
- [Gooey](https://github.com/chriskiehl/Gooey) - Превратите CLI-программы в полноценное GUI-приложение одной строкой.
- [kivy](https://kivy.org/) - Библиотека для создания NUI-приложений на Windows, Linux, Mac OS X, Android и iOS.
- [NiceGUI](https://github.com/zauberzeug/nicegui) - Простой в использовании UI-фреймворк на Python, который отображается в вашем веб-браузере.
- [pyglet](https://github.com/pyglet/pyglet) - Кроссплатформенная библиотека оконной системы и мультимедиа для Python.
- [PyGObject](https://pygobject.readthedocs.io/) - Python-привязки для GLib/GObject/GIO/GTK+ (GTK+3).
- [PySide](https://doc.qt.io/qtforpython/) - Qt for Python предоставляет официальные Python-привязки для [Qt](https://www.qt.io/); это похоже на PyQt, но это официальный биндинг с другой лицензией.
- [PyQt](https://www.riverbankcomputing.com/static/Docs/PyQt6/) - Python-привязки к кроссплатформенному фреймворку приложений и UI [Qt](https://www.qt.io/).
- [pywebview](https://github.com/r0x0r/pywebview/) - Лёгкая кроссплатформенная нативная обёртка над компонентом webview.
- [Tkinter](https://wiki.python.org/moin/TkInter) - Tkinter — де-факто стандартный GUI-пакет Python.
- [Toga](https://github.com/pybee/toga) - Нативный GUI-инструментарий для Python и ОС.
- [urwid](https://urwid.org/) - Библиотека для создания терминальных GUI-приложений с хорошей поддержкой виджетов, событий, богатых цветов и т. п.
- [wxPython](https://wxpython.org/) - Смешение C++ библиотеки классов wxWidgets с Python.

## GraphQL

_Библиотеки для работы с GraphQL._

- [graphene](https://github.com/graphql-python/graphene/) - GraphQL-фреймворк для Python.
- [strawberry-django](https://github.com/strawberry-graphql/strawberry-django) - Интеграция Strawberry GraphQL с Django.

## Разработка игр

_Отличные библиотеки для разработки игр._

- [Arcade](https://api.arcade.academy/en/latest/) - Современный Python-фреймворк для создания игр с выразительной графикой и звуком.
- [Cocos2d](https://www.cocos.com/en/cocos2d-x) - Фреймворк для создания 2D-игр, демо и других графических/интерактивных приложений.
- [Harfang3D](http://www.harfang3d.com) - Python-фреймворк для 3D, VR и разработки игр.
- [Panda3D](https://www.panda3d.org/) - 3D-движок, разработанный Disney.
- [Pygame](https://www.pygame.org/news.html) - Набор Python-модулей, предназначенных для написания игр.
- [PyOgre](http://www.ogre3d.org/tikiwiki/PyOgre) - Python-привязки к Ogre 3D render engine; можно использовать для игр, симуляций — всего, что связано с 3D.
- [PyOpenGL](http://pyopengl.sourceforge.net/) - Python ctypes-привязки к OpenGL и связанным API.
- [PySDL2](https://pysdl2.readthedocs.io) - Обёртка на основе ctypes для библиотеки SDL2.
- [RenPy](https://www.renpy.org/) - Движок визуальных новелл.

## Геолокация

_Библиотеки для геокодирования адресов и работы с широтами и долготами._

- [django-countries](https://github.com/SmileyChris/django-countries) - Django-приложение, добавляющее поле страны для моделей и форм.
- [geodjango](https://docs.djangoproject.com/en/dev/ref/contrib/gis/) - Географический веб-фреймворк мирового уровня.
- [geojson](https://github.com/jazzband/geojson) - Python-привязки и утилиты для GeoJSON.
- [geopandas](https://github.com/geopandas/geopandas) - Python-инструменты для геоданных (GeoSeries/GeoDataFrame) поверх pandas.
- [geopy](https://github.com/geopy/geopy) - Набор инструментов геокодирования на Python.

## Манипуляции с HTML

_Библиотеки для работы с HTML и XML._

- [beautifulsoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) - «Питоничные» идиомы для итерации, поиска и модификации HTML или XML.
- [cssutils](https://pypi.org/project/cssutils/) - CSS-библиотека для Python.
- [html5lib](https://github.com/html5lib/html5lib-python) - Соответствующая стандартам библиотека для парсинга и сериализации HTML-документов и фрагментов.
- [JustHTML](https://github.com/EmilStenstrom/justhtml/) - Парсер HTML5 на чистом Python, который просто работает.
- [lxml](https://lxml.de/) - Очень быстрая, простая и универсальная библиотека для работы с HTML и XML.
- [markupsafe](https://github.com/pallets/markupsafe) - Реализует XML/HTML/XHTML Markup-safe строки для Python.
- [pyquery](https://github.com/gawel/pyquery) - Библиотека парсинга HTML в стиле jQuery.
- [untangle](https://github.com/stchris/untangle) - Преобразует XML-документы в Python-объекты для удобного доступа.
- [WeasyPrint](https://weasyprint.org) - Движок визуального рендеринга HTML и CSS, умеющий экспортировать в PDF.
- [xmldataset](https://xmldataset.readthedocs.io/en/latest/) - Простой парсинг XML.
- [xmltodict](https://github.com/martinblech/xmltodict) - Работа с XML так, словно вы работаете с JSON.

## HTTP-клиенты

_Библиотеки для работы с HTTP._

- [httpx](https://github.com/encode/httpx) - HTTP-клиент следующего поколения для Python.
- [requests](https://github.com/psf/requests) - HTTP-запросы для людей.
- [treq](https://github.com/twisted/treq) - API в стиле requests поверх HTTP-клиента Twisted.
- [urllib3](https://github.com/urllib3/urllib3) - HTTP-библиотека с потокобезопасным пулом соединений, поддержкой отправки файлов и «дружелюбная к здравому смыслу».

## Аппаратное обеспечение

_Библиотеки для программирования аппаратуры._

- [bleak](https://github.com/hbldh/bleak) - Кроссплатформенный Bluetooth Low Energy клиент для Python на asyncio.
- [mouse](https://github.com/boppreh/mouse) - Хуки и симуляция глобальных событий мыши на Windows и Linux.
- [pynput](https://github.com/moses-palmer/pynput) - Библиотека для управления и мониторинга устройств ввода.
- [scapy](https://github.com/secdev/scapy) - Великолепная библиотека для манипуляции пакетами.

## Обработка изображений

_Библиотеки для манипуляции изображениями._

- [pillow](https://github.com/python-pillow/Pillow) - Pillow — дружелюбный форк [PIL](http://www.pythonware.com/products/pil/).
- [pymatting](https://github.com/pymatting/pymatting) - Библиотека для alpha matting.
- [python-barcode](https://github.com/WhyNotHugo/python-barcode) - Создание штрихкодов на Python без дополнительных зависимостей.
- [python-qrcode](https://github.com/lincolnloop/python-qrcode) - Генератор QR-кодов на чистом Python.
- [pyvips](https://github.com/libvips/pyvips) - Быстрая библиотека обработки изображений с низким потреблением памяти.
- [quads](https://github.com/fogleman/Quads) - Компьютерное искусство на основе квадродеревьев.
- [scikit-image](https://scikit-image.org/) - Python-библиотека для (научной) обработки изображений.
- [thumbor](https://github.com/thumbor/thumbor) - Умный сервис обработки изображений: обрезка, изменение размера и отражение по запросу.
- [wand](https://github.com/emcconville/wand) - Python-привязки к [MagickWand](http://www.imagemagick.org/script/magick-wand.php), C API для ImageMagick.

## Реализации

_Реализации Python._

- [clpython](https://github.com/metawilm/cl-python) - Реализация языка программирования Python, написанная на Common Lisp.
- [cpython](https://github.com/python/cpython) - Стандартная и наиболее распространённая реализация Python, написанная на C.
- [cython](https://github.com/cython/cython) - Оптимизирующий статический компилятор для Python.
- [ironpython](https://github.com/IronLanguages/ironpython3) - Реализация Python, написанная на C#.
- [micropython](https://github.com/micropython/micropython) - Компактная и эффективная реализация языка Python.
- [numba](https://github.com/numba/numba) - JIT-компилятор Python в LLVM, ориентированный на научный Python.
- [peachpy](https://github.com/Maratyszcza/PeachPy) - Ассемблер x86-64, встроенный в Python.
- [pypy](https://foss.heptapod.net/pypy/pypy) - Очень быстрая и соответствующая спецификациям реализация Python.
- [pyston](https://github.com/pyston/pyston/) - Реализация Python с использованием JIT-техник.

## Интерактивный интерпретатор

_Интерактивные интерпретаторы Python (REPL)._

- [bpython](https://github.com/bpython/bpython) - Красивый интерфейс к интерпретатору Python.
- [Jupyter Notebook (IPython)](https://jupyter.org) - Богатый набор инструментов, чтобы использовать Python интерактивно по максимуму.
  - [awesome-jupyter](https://github.com/markusschanta/awesome-jupyter)
- [marimo](https://github.com/marimo-team/marimo) - Трансформируйте данные и обучайте модели: ощущается как ноутбук следующего поколения, хранится как Git-дружественный Python.
- [ptpython](https://github.com/jonathanslenders/ptpython) - Продвинутый Python REPL на базе [python-prompt-toolkit](https://github.com/jonathanslenders/python-prompt-toolkit).

## Интернационализация

_Библиотеки для работы с i18n._

- [Babel](https://babel.pocoo.org/en/latest/) - Библиотека интернационализации для Python.

## Планировщики задач

_Библиотеки для планирования задач._

- [Airflow](https://airflow.apache.org/) - Платформа для программного описания, планирования и мониторинга workflow.
- [APScheduler](http://apscheduler.readthedocs.io/en/latest/) - Лёгкий, но мощный in-process планировщик задач, позволяющий планировать функции.
- [django-schedule](https://github.com/thauber/django-schedule) - Календарное приложение для Django.
- [doit](http://pydoit.org/) - Task runner и build tool.
- [Joblib](https://joblib.readthedocs.io/) - Набор инструментов для лёгкого пайплайнинга в Python.
- [Plan](https://github.com/fengsp/plan) - Пишет crontab-файлы на Python, как по волшебству.
- [Prefect](https://github.com/PrefectHQ/prefect) - Современный фреймворк оркестрации workflow, упрощающий создание, планирование и мониторинг устойчивых data pipeline.
- [schedule](https://github.com/dbader/schedule) - Планирование задач на Python для людей.
- [Spiff](https://github.com/knipknap/SpiffWorkflow) - Мощный движок workflow, реализованный на чистом Python.
- [TaskFlow](https://docs.openstack.org/developer/taskflow/) - Библиотека Python, которая помогает выполнять задачи легко, последовательно и надёжно.

## Логирование

_Библиотеки для генерации логов и работы с ними._

- [logbook](http://logbook.readthedocs.io/en/stable/) - Замена стандартного logging для Python.
- [logging](https://docs.python.org/3/library/logging.html) - (Стандартная библиотека Python) Подсистема логирования.
- [loguru](https://github.com/Delgan/loguru) - Библиотека, которая стремится сделать логирование на Python приятным.
- [sentry-python](https://github.com/getsentry/sentry-python) - Sentry SDK для Python.
- [structlog](https://www.structlog.org/en/stable/) - Структурированное логирование без боли.

## Машинное обучение

_Библиотеки для машинного обучения. Также см. [awesome-machine-learning](https://github.com/josephmisiti/awesome-machine-learning#python)._

- [diffusers](https://github.com/huggingface/diffusers) - Библиотека с предобученными diffusion-моделями для генерации и редактирования изображений, аудио и видео.
- [gym](https://github.com/openai/gym) - Набор инструментов для разработки и сравнения алгоритмов обучения с подкреплением.
- [Feature-engine](https://github.com/feature-engine/feature_engine) - Совместимый со sklearn API с широким набором инструментов для feature engineering и отбора признаков.
- [H2O](https://github.com/h2oai/h2o-3) - Быстрая масштабируемая open source платформа машинного обучения.
- [LangChain](https://github.com/langchain-ai/langchain) - Создание приложений с LLM через композицию.
- [LlamaIndex](https://github.com/run-llama/llama_index) - Data-фреймворк для вашего LLM-приложения.
- [Metrics](https://github.com/benhamner/Metrics) - Метрики оценки качества машинного обучения.
- [MindsDB](https://github.com/mindsdb/mindsdb) - Open source AI-слой для существующих баз данных: позволяет легко разрабатывать, обучать и развёртывать современные ML-модели с использованием стандартных запросов.
- [PraisonAI](https://github.com/MervinPraison/PraisonAI) - Production-ready фреймворк Multi-AI Agents с саморефлексией, поддержкой 100+ LLM, интеграцией MCP и agentic-workflow.
- [pydantic-ai](https://github.com/pydantic/pydantic-ai) - Python agent framework для генеративных AI-приложений со структурированными схемами.
- [RAGFlow](https://github.com/infiniflow/ragflow) - Open-source RAG-движок для понимания документов и вопросов-ответов с LLM.
- [rasa](https://github.com/RasaHQ/rasa) - Open source ML-фреймворк для автоматизированных разговоров на основе текста и голоса.
- [scikit-learn](http://scikit-learn.org/) - Самая популярная Python-библиотека для машинного обучения с обширной документацией и поддержкой сообщества.
- [Spark ML](http://spark.apache.org/docs/latest/ml-guide.html) - Масштабируемая библиотека машинного обучения [Apache Spark](http://spark.apache.org/) для распределённых вычислений.
- [Transformers](https://github.com/huggingface/transformers) - Фреймворк, позволяющий легко использовать предобученные transformer-модели для задач NLP, vision и audio.
- [xgboost](https://github.com/dmlc/xgboost) - Масштабируемая переносимая и распределённая библиотека градиентного бустинга.

## Microsoft Windows

_Программирование на Python в Microsoft Windows._

- [PythonNet](https://github.com/pythonnet/pythonnet) - Интеграция Python с .NET Common Language Runtime (CLR).
- [PyWin32](https://github.com/mhammond/pywin32) - Расширения Python для Windows.
- [WinPython](https://winpython.github.io/) - Переносимая среда разработки для Windows 10/11.

## Разное

_Полезные библиотеки или инструменты, которые не подходят к категориям выше._

- [blinker](https://github.com/jek/blinker) - Быстрая in-process система сигналов/событий для Python.
- [boltons](https://github.com/mahmoud/boltons) - Набор утилит на чистом Python.
- [itsdangerous](https://github.com/pallets/itsdangerous) - Различные помощники для передачи доверенных данных в недоверенную среду.
- [pluginbase](https://github.com/mitsuhiko/pluginbase) - Простая, но гибкая система плагинов для Python.
- [tryton](http://www.tryton.org/) - Бизнес-фреймворк общего назначения.

## Обработка естественного языка

_Библиотеки для работы с человеческими языками._

- Общее
  - [gensim](https://github.com/RaRe-Technologies/gensim) - Тематическое моделирование для людей.
  - [langid.py](https://github.com/saffsd/langid.py) - Автономная система определения языка.
  - [nltk](https://www.nltk.org/) - Ведущая платформа для создания Python-программ для работы с данными естественного языка.
  - [pattern](https://github.com/clips/pattern) - Модуль web mining.
  - [polyglot](https://github.com/aboSamoor/polyglot) - NLP-пайплайн с поддержкой сотен языков.
  - [spacy](https://spacy.io/) - Библиотека индустриального уровня для NLP на Python и Cython.
  - [Stanza](https://github.com/stanfordnlp/stanza) - Официальная Python-библиотека Stanford NLP Group с поддержкой 60+ языков.
- Китайский
  - [funNLP](https://github.com/fighting41love/funNLP) - Набор инструментов и датасетов для китайского NLP.
  - [jieba](https://github.com/fxsjy/jieba) - Самая популярная библиотека сегментации китайского текста.
  - [pkuseg-python](https://github.com/lancopku/pkuseg-python) - Инструментарий сегментации китайских слов в разных доменах.
  - [snownlp](https://github.com/isnowfy/snownlp) - Библиотека обработки китайского текста.

## Виртуализация сети

_Инструменты и библиотеки для виртуальных сетей и SDN (Software Defined Networking)._

- [mininet](https://github.com/mininet/mininet) - Популярный сетевой эмулятор и API, написанные на Python.
- [napalm](https://github.com/napalm-automation/napalm) - Кросс-вендорный API для управления сетевыми устройствами.
- [pox](https://github.com/noxrepo/pox) - Python-приложения для SDN-контроллеров, например OpenFlow SDN.

## ORM

_Библиотеки, реализующие объектно-реляционное отображение (Object-Relational Mapping) или техники сопоставления данных (data mapping)._

- Реляционные базы данных
  - [Django Models](https://docs.djangoproject.com/en/dev/topics/db/models/) - Django ORM.
  - [SQLAlchemy](https://www.sqlalchemy.org/) - Инструментарий SQL для Python и объектно-реляционный маппер.
    - [awesome-sqlalchemy](https://github.com/dahlia/awesome-sqlalchemy)
  - [dataset](https://github.com/pudo/dataset) - Хранит Python dict в базе данных — работает с SQLite, MySQL и PostgreSQL.
  - [peewee](https://github.com/coleifer/peewee) - Небольшая выразительная ORM.
  - [pony](https://github.com/ponyorm/pony/) - ORM, предоставляющая генератор-ориентированный интерфейс к SQL.
  - [pydal](https://github.com/web2py/pydal/) - Слой абстракции базы данных на чистом Python.
  - [SQLModel](https://sqlmodel.tiangolo.com/) - SQLModel основан на аннотациях типов Python и работает на базе Pydantic и SQLAlchemy.
- NoSQL-базы данных
  - [mongoengine](https://github.com/MongoEngine/mongoengine) - Python Object-Document-Mapper для работы с MongoDB.
  - [ODMantic](https://github.com/art049/odmantic) - Sync и Async ODM для MongoDB поверх Pydantic для определения и валидации моделей.
  - [PynamoDB](https://github.com/pynamodb/PynamoDB) - «Питоничный» интерфейс к [Amazon DynamoDB](https://aws.amazon.com/dynamodb/).

## Управление пакетами

_Библиотеки для управления пакетами и зависимостями._

- [pip](https://pip.pypa.io/en/stable/) - Установщик пакетов для Python.
  - [pip-tools](https://github.com/jazzband/pip-tools) - Набор инструментов, чтобы поддерживать зафиксированные зависимости Python в актуальном состоянии.
- [conda](https://github.com/conda/conda/) - Кроссплатформенный, независимый от Python бинарный менеджер пакетов.
- [hatch](https://github.com/pypa/hatch) - Современное расширяемое управление Python-проектами.
- [poetry](https://github.com/sdispater/poetry) - Управление зависимостями и сборкой/пакетированием Python стало проще.
- [uv](https://github.com/astral-sh/uv) - Очень быстрый менеджер пакетов и проектов Python, написанный на Rust.

## Репозитории пакетов

_Локальные серверы репозиториев PyPI и прокси._

- [bandersnatch](https://github.com/pypa/bandersnatch/) - Инструмент зеркалирования PyPI от Python Packaging Authority (PyPA).
- [devpi](https://github.com/devpi/devpi) - PyPI-сервер и инструмент для пакетирования/тестирования/релизов.
- [warehouse](https://github.com/pypa/warehouse) - Репозиторий пакетов Python следующего поколения (PyPI).

## Тестирование на проникновение

_Фреймворки и инструменты для тестирования на проникновение._

- [fsociety](https://github.com/Manisso/fsociety) - Фреймворк для тестирования на проникновение.
- [setoolkit](https://github.com/trustedsec/social-engineer-toolkit) - Набор инструментов для социальной инженерии.
- [sherlock](https://github.com/sherlock-project/sherlock) - Поиск аккаунтов в соцсетях по имени пользователя на разных платформах.
- [sqlmap](https://github.com/sqlmapproject/sqlmap) - Автоматический инструмент для SQL-инъекций и захвата баз данных.

## Права доступа

_Библиотеки, которые разрешают или запрещают пользователям доступ к данным или функциональности._

- [django-guardian](https://github.com/django-guardian/django-guardian) - Реализация объектных (per-object) прав для Django 1.2+
- [django-rules](https://github.com/dfunckt/django-rules) - Небольшое, но мощное приложение с объектными правами для Django без необходимости базы данных.

## Процессы

_Библиотеки для запуска и общения с процессами ОС._

- [delegator.py](https://github.com/amitt001/delegator.py) - [Subprocesses](https://docs.python.org/3/library/subprocess.html) для людей 2.0.
- [sarge](https://sarge.readthedocs.io/en/latest/) - Ещё одна обёртка над subprocess.
- [sh](https://github.com/amoffat/sh) - Полноценная замена subprocess для Python.

## Квантовые вычисления

_Библиотеки для квантовых вычислений._

- [Cirq](https://github.com/quantumlib/Cirq) — Фреймворк от Google, ориентированный на аппаратно-осознанный дизайн квантовых схем для NISQ-устройств.
- [PennyLane](https://github.com/PennyLaneAI/pennylane) — Гибридная квантово-классическая библиотека машинного обучения с поддержкой автодифференцирования.
- [Qiskit](https://github.com/Qiskit/qiskit) — Квантовый SDK при поддержке IBM для построения, симуляции и запуска схем на реальном квантовом железе.
- [QuTiP](http://qutip.org/) - Quantum Toolbox на Python.

## Рекомендательные системы

_Библиотеки для создания рекомендательных систем._

- [annoy](https://github.com/spotify/annoy) - Приближённый поиск ближайших соседей на C++/Python с оптимизацией по памяти.
- [fastFM](https://github.com/ibayer/fastFM) - Библиотека для факторизационных машин.
- [implicit](https://github.com/benfred/implicit) - Быстрая реализация collaborative filtering на Python для implicit-датасетов.
- [lightfm](https://github.com/lyst/lightfm) - Python-реализация ряда популярных рекомендательных алгоритмов.
- [spotlight](https://github.com/maciejkula/spotlight) - Глубокие рекомендательные модели на PyTorch.
- [Surprise](https://github.com/NicolasHug/Surprise) - «Scikit» для построения и анализа рекомендательных систем.
- [tensorrec](https://github.com/jfkirk/tensorrec) - Фреймворк рекомендательного движка на TensorFlow.

## Рефакторинг

_Инструменты и библиотеки рефакторинга для Python._

- [Bowler](https://pybowler.io/) - Безопасный рефакторинг кода для современного Python.
- [Rope](https://github.com/python-rope/rope) - Rope — библиотека рефакторинга на Python.

## RESTful API

_Библиотеки для построения RESTful API._

- Django
  - [django-rest-framework](https://github.com/encode/django-rest-framework) - Мощный и гибкий набор инструментов для создания веб-API.
  - [django-tastypie](https://github.com/django-tastypie/django-tastypie) - Создание «вкусных» API для Django-приложений.
- Flask
  - [eve](https://github.com/pyeve/eve) - REST API-фреймворк на базе Flask и MongoDB, с добрыми намерениями.
  - [flask-api](https://github.com/flask-api/flask-api) - Просматриваемые веб-API для Flask.
  - [flask-restful](https://github.com/flask-restful/flask-restful) - Быстрое создание REST API для Flask.
- Pyramid
  - [cornice](https://github.com/Cornices/cornice) - RESTful-фреймворк для Pyramid.
- Независимо от фреймворка
  - [falcon](https://github.com/falconry/falcon) - Высокопроизводительный фреймворк для облачных API и бэкендов веб-приложений.
  - [fastapi](https://github.com/tiangolo/fastapi) - Современный быстрый веб-фреймворк для API на Python 3.6+ на основе стандартных аннотаций типов.
  - [hug](https://github.com/hugapi/hug) - Python 3 фреймворк для аккуратной публикации API.
  - [sandman2](https://github.com/jeffknupp/sandman2) - Автоматизированные REST API для существующих систем на базе БД.
  - [sanic](https://github.com/sanic-org/sanic) - Веб-сервер и веб-фреймворк на Python 3.6+, написанный «чтобы было быстро».

## Робототехника

_Библиотеки для робототехники._

- [PythonRobotics](https://github.com/AtsushiSakai/PythonRobotics) - Компиляция различных алгоритмов робототехники с визуализациями.

## RPC-серверы

_Серверы, совместимые с RPC._

- [RPyC](https://github.com/tomerfiliba/rpyc) (Remote Python Call) - Прозрачная симметричная RPC-библиотека для Python
- [zeroRPC](https://github.com/0rpc/zerorpc-python) - Гибкая RPC-реализация на базе [ZeroMQ](http://zeromq.org/) и [MessagePack](http://msgpack.org/).

## Наука

_Библиотеки для научных вычислений. Также см. [Python-for-Scientists](https://github.com/TomNicholas/Python-for-Scientists)._

- [astropy](https://www.astropy.org/) - Комьюнити-библиотека Python для астрономии.
- [bcbio-nextgen](https://github.com/chapmanb/bcbio-nextgen) - Пайплайны best-practice для полностью автоматизированного анализа высокопроизводительного секвенирования.
- [bcbb](https://github.com/chapmanb/bcbb) - Коллекция полезного кода, связанного с биологическим анализом.
- [Biopython](http://biopython.org/wiki/Main_Page) - Набор свободно доступных инструментов для биологических вычислений.
- [cclib](http://cclib.github.io/) - Библиотека для парсинга и интерпретации результатов пакетов вычислительной химии.
- [Colour](http://colour-science.org/) - Реализация комплексного набора преобразований и алгоритмов теории цвета.
- [Karate Club](https://github.com/benedekrozemberczki/karateclub) - Unsupervised ML-инструментарий для данных графовой структуры.
- [manim](https://github.com/ManimCommunity/manim) - Движок анимации для объясняющих математических видео.
- [NetworkX](https://networkx.github.io/) - Высокопродуктивный софт для сложных сетей.
- [NIPY](http://nipy.org) - Коллекция инструментов нейровизуализации.
- [NumPy](http://www.numpy.org/) - Базовый пакет для научных вычислений на Python.
- [ObsPy](https://github.com/obspy/obspy/wiki/) - Python-инструментарий для сейсмологии.
- [Open Babel](https://open-babel.readthedocs.io/) - Химический инструментарий, «говорящий» на многих языках химических данных.
- [PathSim](https://github.com/pathsim/pathsim) - Фреймворк моделирования и симуляции на основе блоков с визуальным редактором в браузере.
- [PyDy](http://www.pydy.org/) - Python Dynamics: помогает в workflow моделирования динамического движения.
- [PyMC](https://github.com/pymc-devs/pymc3) - Набор инструментов для сэмплирования Марковских цепей Монте-Карло.
- [RDKit](http://www.rdkit.org/) - Софт для хемоинформатики и машинного обучения.
- [SciPy](https://www.scipy.org/) - Экосистема open source софта для математики, науки и инженерии на Python.
- [shapely](https://github.com/shapely/shapely) - Манипулирование и анализ геометрических объектов в декартовой плоскости.
- [SimPy](https://gitlab.com/team-simpy/simpy) - Дискретно-событийный фреймворк симуляции на основе процессов.
- [statsmodels](https://github.com/statsmodels/statsmodels) - Статистическое моделирование и эконометрика на Python.
- [SymPy](https://github.com/sympy/sympy) - Python-библиотека символьной математики.
- [Zipline](https://github.com/quantopian/zipline) - «Питоничная» библиотека алгоритмической торговли.

## Поиск

_Библиотеки и софт для индексирования и выполнения поисковых запросов по данным._

- [django-haystack](https://github.com/django-haystack/django-haystack) - Модульный поиск для Django.
- [elasticsearch-dsl-py](https://github.com/elastic/elasticsearch-dsl-py) - Официальный высокоуровневый Python-клиент для Elasticsearch.
- [elasticsearch-py](https://www.elastic.co/guide/en/elasticsearch/client/python-api/current/index.html) - Официальный низкоуровневый Python-клиент для [Elasticsearch](https://www.elastic.co/products/elasticsearch).
- [pysolr](https://github.com/django-haystack/pysolr) - Лёгкая Python-обёртка для [Apache Solr](https://lucene.apache.org/solr/).
- [whoosh](http://whoosh.readthedocs.io/en/latest/) - Быстрая «чисто Python» библиотека поискового движка.

## Сериализация

_Библиотеки для сериализации сложных типов данных._

- [marshmallow](https://github.com/marshmallow-code/marshmallow) - Лёгкая библиотека для преобразования сложных объектов в простые python-типажи и обратно.
- [orjson](https://github.com/ijl/orjson) - Быстрая и корректная JSON-библиотека.
- [pysimdjson](https://github.com/TkTech/pysimdjson) - Python-привязки для [simdjson](https://github.com/lemire/simdjson).
- [python-rapidjson](https://github.com/python-rapidjson/python-rapidjson) - Python-обёртка над [RapidJSON](https://github.com/Tencent/rapidjson).
- [toonify](https://github.com/ScrapeGraphAI/toonify) - Компактный человекочитаемый формат сериализации, уменьшающий расход токенов LLM на 30–60% по сравнению с JSON.
- [ultrajson](https://github.com/esnme/ultrajson) - Быстрый JSON-декодер и энкодер на C с Python-привязками.

## Serverless-фреймворки

_Фреймворки для разработки serverless-кода на Python._

- [python-lambda](https://github.com/nficano/python-lambda) - Набор инструментов для разработки и деплоя Python-кода в AWS Lambda.
- [Zappa](https://github.com/zappa/Zappa) - Инструмент для деплоя WSGI-приложений в AWS Lambda и API Gateway.

## Оболочка

_Shell-оболочки, созданные на Python._

- [xonsh](https://github.com/xonsh/xonsh/) - Оболочка на базе Python. Полнофункциональная и кроссплатформенная.

## Обработка специфических форматов

_Библиотеки для парсинга и манипулирования специфическими текстовыми форматами._

- Общее
  - [kreuzberg](https://github.com/kreuzberg-dev/kreuzberg) - Высокопроизводительная библиотека извлечения данных из документов с ядром на Rust, поддерживает 62+ формата, включая PDF, Office, изображения с OCR, HTML, email и архивы.
  - [tablib](https://github.com/jazzband/tablib) - Модуль для табличных датасетов в XLS, CSV, JSON, YAML.
- Office
  - [docxtpl](https://github.com/elapouya/python-docx-template) - Редактирование docx-документа с помощью шаблона jinja2
  - [openpyxl](https://openpyxl.readthedocs.io/en/stable/) - Библиотека чтения и записи файлов Excel 2010 xlsx/xlsm/xltx/xltm.
  - [pyexcel](https://github.com/pyexcel/pyexcel) - Единый API для чтения, манипулирования и записи файлов csv, ods, xls, xlsx и xlsm.
  - [python-docx](https://github.com/python-openxml/python-docx) - Читает, запрашивает и изменяет файлы Microsoft Word 2007/2008 docx.
  - [python-pptx](https://github.com/scanny/python-pptx) - Python-библиотека для создания и обновления PowerPoint (.pptx) файлов.
  - [XlsxWriter](https://github.com/jmcnamara/XlsxWriter) - Python-модуль для создания Excel .xlsx файлов.
  - [xlwings](https://github.com/ZoomerAnalytics/xlwings) - BSD-лицензированная библиотека, упрощающая вызов Python из Excel и наоборот.
- PDF
  - [pdfminer.six](https://github.com/pdfminer/pdfminer.six) - Pdfminer.six — комьюнити-форк оригинального PDFMiner.
  - [pikepdf](https://github.com/pikepdf/pikepdf) - Мощная библиотека для чтения и редактирования PDF, основанная на qpdf.
  - [PyPDF2](https://github.com/mstamy2/PyPDF2) - Библиотека, умеющая разрезать, объединять и трансформировать страницы PDF.
  - [ReportLab](https://www.reportlab.com/opensource/) - Быстрое создание богатых PDF-документов.
- Markdown
  - [Jimmy](https://github.com/marph91/jimmy) - Конвертирует ваши заметки в Markdown.
  - [Mistune](https://github.com/lepture/mistune) - Самые быстрые и функциональные парсеры Markdown на чистом Python.
  - [Python-Markdown](https://github.com/waylan/Python-Markdown) - Реализация Markdown Джона Грубера на Python.
- YAML
  - [PyYAML](http://pyyaml.org/) - Реализации YAML для Python.
- CSV
  - [csvkit](https://github.com/wireservice/csvkit) - Утилиты для конвертации и работы с CSV.
- Архивы
  - [unp](https://github.com/mitsuhiko/unp) - CLI-инструмент, который легко распаковывает архивы.

## Генераторы статических сайтов

_Генератор статических сайтов — это софт, который берёт на вход текст + шаблоны и выдаёт на выходе HTML-файлы._

- [lektor](https://github.com/lektor/lektor) - Простая в использовании статическая CMS и движок блога.
- [makesite](https://github.com/sunainapai/makesite) - Простой, лёгкий и без магии генератор статических сайтов/блогов (< 130 строк).
- [mkdocs](https://github.com/mkdocs/mkdocs/) - Генератор документации, дружелюбный к Markdown.
- [nikola](https://github.com/getnikola/nikola) - Генератор статических сайтов и блогов.
- [pelican](https://github.com/getpelican/pelican) - Генератор статических сайтов с поддержкой Markdown и reST.

## Очереди задач

_Библиотеки для работы с очередями задач._

- [celery](https://docs.celeryproject.org/en/stable/) - Асинхронная очередь задач/job queue на основе распределённого обмена сообщениями.
- [dramatiq](https://github.com/Bogdanp/dramatiq) - Быстрая и надёжная библиотека фоновой обработки задач для Python 3.
- [huey](https://github.com/coleifer/huey) - Небольшая многопоточная очередь задач.
- [mrq](https://github.com/pricingassistant/mrq) - Распределённая очередь задач-воркеров на Python с Redis и gevent.
- [rq](https://github.com/rq/rq) - Простые очереди задач для Python.

## Шаблонизаторы

_Библиотеки и инструменты шаблонизации и лексинга._

- [Genshi](https://genshi.edgewall.org/) - Набор инструментов шаблонизации Python для генерации web-aware вывода.
- [Jinja2](https://github.com/pallets/jinja) - Современный и дизайнеро-дружелюбный язык шаблонов.
- [Mako](http://www.makotemplates.org/) - Сверхбыстрая лёгкая шаблонизация для платформы Python.

## Тестирование

_Библиотеки для тестирования кодовых баз и генерации тестовых данных._

- Тестовые фреймворки
  - [hypothesis](https://github.com/HypothesisWorks/hypothesis) - Продвинутая библиотека property-based тестирования в стиле Quickcheck.
  - [nose2](https://github.com/nose-devs/nose2) - Наследник `nose`, основанный на `unittest2.
  - [pytest](https://docs.pytest.org/en/latest/) - Зрелый полнофункциональный инструмент тестирования Python.
  - [Robot Framework](https://github.com/robotframework/robotframework) - Универсальный фреймворк автоматизации тестирования.
  - [ScanAPI](https://pypi.org/project/scanapi/) - Автоматизированное тестирование и документация для вашего REST API.
  - [unittest](https://docs.python.org/3/library/unittest.html) - (Стандартная библиотека Python) Фреймворк модульного тестирования.
- Запускатели тестов
  - [green](https://github.com/CleanCut/green) - Чистый и красочный test runner.
  - [mamba](http://nestorsalceda.github.io/mamba/) - Определяющий инструмент тестирования для Python. Рождён под знаменем BDD.
  - [tox](https://tox.readthedocs.io/en/latest/) - Автосборка и тестирование дистрибутивов в нескольких версиях Python
- GUI / Web тестирование
  - [locust](https://github.com/locustio/locust) - Масштабируемый инструмент нагрузочного тестирования пользователей, написанный на Python.
  - [PyAutoGUI](https://github.com/asweigart/pyautogui) - Кроссплатформенный модуль GUI-автоматизации на Python для людей.
  - [Schemathesis](https://github.com/kiwicom/schemathesis) - Инструмент для автоматического property-based тестирования веб-приложений, построенных по спецификациям Open API / Swagger.
  - [Selenium](https://pypi.org/project/selenium/) - Python-привязки для [Selenium](https://selenium.dev/) [WebDriver](https://selenium.dev/documentation/webdriver/).
  - [splinter](https://github.com/cobrateam/splinter) - Open source инструмент для тестирования веб-приложений.
- Моки
  - [doublex](https://pypi.org/project/doublex/) - Мощный фреймворк test doubles для Python.
  - [freezegun](https://github.com/spulec/freezegun) - Путешествия во времени через мок datetime.
  - [httmock](https://github.com/patrys/httmock) - Библиотека моков для requests для Python 2.6+ и 3.2+.
  - [httpretty](https://github.com/gabrielfalcao/HTTPretty) - Инструмент моков HTTP-запросов для Python.
  - [mock](https://docs.python.org/3/library/unittest.mock.html) - (Стандартная библиотека Python) Библиотека мокинга и патчинга.
  - [mocket](https://github.com/mindflayer/python-mocket) - Фреймворк моков сокетов с поддержкой gevent/asyncio/SSL.
  - [responses](https://github.com/getsentry/responses) - Утилитная библиотека для мокинга requests.
  - [VCR.py](https://github.com/kevin1024/vcrpy) - Запись и воспроизведение HTTP-взаимодействий в тестах.
- Фабрики объектов
  - [factory_boy](https://github.com/FactoryBoy/factory_boy) - Замена тестовых фикстур для Python.
  - [mixer](https://github.com/klen/mixer) - Ещё одна замена фикстур. Поддерживает Django, Flask, SQLAlchemy, Peewee и т. п.
  - [polyfactory](https://github.com/litestar-org/polyfactory) - Библиотека генерации мок-данных с поддержкой классов (продолжение `pydantic-factories`)
- Покрытие кода
  - [coverage](https://pypi.org/project/coverage/) - Измерение покрытия кода.
- Фейковые данные
  - [faker](https://github.com/joke2k/faker) - Пакет Python, генерирующий фейковые данные.
  - [mimesis](https://github.com/lk-geimfari/mimesis) - Python-библиотека, помогающая генерировать фейковые данные.

## Обработка текста

_Библиотеки для парсинга и манипулирования обычными текстами._

- Общее
  - [chardet](https://github.com/chardet/chardet) - Детектор кодировок, совместимый с Python 2/3.
  - [difflib](https://docs.python.org/3/library/difflib.html) - (Стандартная библиотека Python) Помощники для вычисления «дельт».
  - [ftfy](https://github.com/LuminosoInsight/python-ftfy) - Делает Unicode-текст менее «поломанным» и более согласованным автоматически.
  - [Levenshtein](https://github.com/ztane/python-Levenshtein/) - Быстрое вычисление расстояния Левенштейна и похожести строк.
  - [pangu.py](https://github.com/vinta/pangu.py) - Параноидальные пробелы в тексте.
  - [pyfiglet](https://github.com/pwaller/pyfiglet) - Реализация figlet, написанная на Python.
  - [pypinyin](https://github.com/mozillazg/python-pinyin) - Преобразует китайские иероглифы hanzi (漢字) в пиньинь (拼音).
  - [textdistance](https://github.com/orsinium/textdistance) - Вычисляет расстояние между последовательностями с 30+ алгоритмами.
  - [unidecode](https://pypi.org/project/Unidecode/) - ASCII-транслитерации Unicode-текста.
- Slugify
  - [awesome-slugify](https://github.com/dimka665/awesome-slugify) - Python slugify-библиотека, способная сохранять unicode.
  - [python-slugify](https://github.com/un33k/python-slugify) - Python slugify-библиотека, переводящая unicode в ASCII.
  - [unicode-slugify](https://github.com/mozilla/unicode-slugify) - Генератор unicode slug'ов с зависимостью от Django.
- Уникальные идентификаторы
  - [hashids](https://github.com/davidaurelio/hashids-python) - Реализация [hashids](http://hashids.org) на Python.
  - [shortuuid](https://github.com/skorokithakis/shortuuid) - Библиотека генерации лаконичных, однозначных и URL-безопасных UUID.
- Парсинг
  - [pygments](http://pygments.org/) - Универсальный подсветчик синтаксиса.
  - [pyparsing](https://github.com/pyparsing/pyparsing) - Фреймворк общего назначения для генерации парсеров.
  - [python-nameparser](https://github.com/derek73/python-nameparser) - Разбор человеческих имён на отдельные компоненты.
  - [python-phonenumbers](https://github.com/daviddrysdale/python-phonenumbers) - Разбор, форматирование, хранение и валидация международных телефонных номеров.
  - [python-user-agents](https://github.com/selwin/python-user-agents) - Парсер browser user agent.
  - [sqlparse](https://github.com/andialbrecht/sqlparse) - Невалидирующий SQL-парсер.

## Манипуляции с URL

_Библиотеки для разбора URL._

- [furl](https://github.com/gruns/furl) - Небольшая Python-библиотека, упрощающая разбор и манипулирование URL.
- [purl](https://github.com/codeinthehole/purl) - Простой неизменяемый (immutable) URL-класс с чистым API для запросов и манипуляций.
- [webargs](https://github.com/marshmallow-code/webargs) - Дружелюбная библиотека для парсинга аргументов HTTP-запросов с встроенной поддержкой популярных веб-фреймворков.

## Видео

_Библиотеки для манипуляции видео и GIF._

- [moviepy](https://zulko.github.io/moviepy/) - Модуль для скриптового монтажа видео во множестве форматов, включая анимированные GIF.
- [scikit-video](https://github.com/aizvorski/scikit-video) - Процедуры обработки видео для SciPy.
- [vidgear](https://github.com/abhiTronix/vidgear) - Очень мощный многопоточный фреймворк обработки видео.

## Управление веб-ассетами

_Инструменты для управления, сжатия и минификации веб-ассетов сайта._

- [django-compressor](https://github.com/django-compressor/django-compressor) - Сжимает подключённые и inline JavaScript или CSS в один кэшируемый файл.
- [django-pipeline](https://github.com/jazzband/django-pipeline) - Библиотека упаковки ассетов для Django.
- [django-storages](https://github.com/jschneier/django-storages) - Коллекция кастомных storage-бэкендов для Django.
- [fanstatic](http://www.fanstatic.org/en/latest/) - Упаковывает, оптимизирует и раздаёт зависимости статических файлов как Python-пакеты.
- [flask-assets](https://github.com/miracle2k/flask-assets) - Помогает интегрировать webassets в ваше Flask-приложение.
- [webassets](https://github.com/miracle2k/webassets) - Бандлит, оптимизирует и управляет уникальными cache-busting URL для статических ресурсов.

## Извлечение веб-контента

_Библиотеки для извлечения веб-контента._

- [html2text](https://github.com/Alir3z4/html2text) - Конвертирует HTML в текст в формате Markdown.
- [lassie](https://github.com/michaelhelmick/lassie) - Получение веб-контента для людей.
- [micawber](https://github.com/coleifer/micawber) - Небольшая библиотека для извлечения расширенного контента из URL.
- [newspaper](https://github.com/codelucas/newspaper) - Извлечение новостей и статей и курирование контента на Python.
- [python-readability](https://github.com/buriy/python-readability) - Быстрый порт инструмента readability от arc90 на Python.
- [requests-html](https://github.com/psf/requests-html) - «Питоничный» HTML-парсинг для людей.
- [sumy](https://github.com/miso-belica/sumy) - Модуль для автоматического суммаризирования текстовых документов и HTML-страниц.
- [textract](https://github.com/deanmalmgren/textract) - Извлекает текст из любых документов: Word, PowerPoint, PDF и т. п.
- [toapi](https://github.com/gaojiuli/toapi) - Каждый сайт предоставляет API.

## Веб-краулинг

_Библиотеки для автоматизации веб-скрейпинга._

- [browser-use](https://github.com/browser-use/browser-use) - Делает сайты доступными для AI-агентов благодаря простой браузерной автоматизации.
- [feedparser](https://github.com/kurtmckee/feedparser) - Универсальный парсер фидов.
- [grab](https://github.com/lorien/grab) - Фреймворк скрейпинга сайтов.
- [mechanicalsoup](https://github.com/MechanicalSoup/MechanicalSoup) - Python-библиотека для автоматизации взаимодействия с веб-сайтами.
- [scrapy](https://github.com/scrapy/scrapy) - Быстрый высокоуровневый фреймворк для скрейпинга и веб-краулинга.

## Веб-фреймворки

_Традиционные full stack веб-фреймворки. Также см. [RESTful API](https://github.com/vinta/awesome-python#restful-api)._

- Синхронные
  - [django](https://github.com/django/django) - Самый популярный веб-фреймворк на Python.
    - [awesome-django](https://github.com/shahraizali/awesome-django)
  - [flask](https://github.com/pallets/flask) - Микрофреймворк для Python.
    - [awesome-flask](https://github.com/humiaozuzu/awesome-flask)
  - [pyramid](https://pylonsproject.org/) - Небольшой, быстрый, приземлённый open source веб-фреймворк на Python.
    - [awesome-pyramid](https://github.com/uralbash/awesome-pyramid)
  - [fastHTML](https://github.com/AnswerDotAI/fasthtml) - Самый быстрый способ создать HTML-приложение.
    - [awesome-fasthtml](https://github.com/amosgyamfi/awesome-fasthtml)
  - [masonite](https://github.com/MasoniteFramework/masonite) - Современный, ориентированный на разработчика веб-фреймворк на Python.
- Асинхронные
  - [Litestar](https://github.com/litestar-org/litestar) - Production-ready, мощный и расширяемый ASGI веб-фреймворк.
  - [microdot](https://github.com/miguelgrinberg/microdot) - Невероятно маленький веб-фреймворк для Python и MicroPython.
  - [reflex](https://github.com/reflex-dev/reflex) – Фреймворк для создания реактивных full-stack веб-приложений целиком на python.
  - [tornado](https://github.com/tornadoweb/tornado) - Веб-фреймворк и асинхронная сетевая библиотека.

## WebSocket

_Библиотеки для работы с WebSocket._

- [autobahn-python](https://github.com/crossbario/autobahn-python) - WebSocket и WAMP для Python на Twisted и [asyncio](https://docs.python.org/3/library/asyncio.html).
- [channels](https://github.com/django/channels) - Дружелюбная асинхронность для Django.
- [websockets](https://github.com/aaugustin/websockets) - Библиотека для построения WebSocket серверов и клиентов с фокусом на корректность и простоту.

## WSGI-серверы

_Веб-серверы, совместимые с WSGI._

- [gunicorn](https://github.com/benoitc/gunicorn) - Pre-fork, портирован из Ruby-проекта Unicorn.
- [uwsgi](https://uwsgi-docs.readthedocs.io/en/latest/) - Проект, нацеленный на разработку полного стека для построения хостинговых сервисов, написан на C.
- [waitress](https://github.com/Pylons/waitress) - Многопоточный, работает под капотом Pyramid.
- [werkzeug](https://github.com/pallets/werkzeug) - WSGI-утилитарная библиотека для Python, на которой работает Flask и которую легко встроить в собственные проекты.

# Ресурсы

Где искать обучающие материалы или новые Python-библиотеки.

## Рассылки

- [Awesome Python Newsletter](http://python.libhunt.com/newsletter)
- [Pycoder's Weekly](https://pycoders.com/)
- [Python Tricks](https://realpython.com/python-tricks/)
- [Python Weekly](https://www.pythonweekly.com/)

## Подкасты

- [Django Chat](https://djangochat.com/)
- [PyPodcats](https://pypodcats.live)
- [Python Bytes](https://pythonbytes.fm)
- [Python Test](https://podcast.pythontest.com/)
- [Talk Python To Me](https://talkpython.fm/)
- [The Real Python Podcast](https://realpython.com/podcasts/rpp/)

# Как внести вклад

Ваш вклад всегда приветствуется! Пожалуйста, сначала ознакомьтесь с [гайдлайнами по внесению вклада](https://github.com/vinta/awesome-python/blob/master/CONTRIBUTING.md).

---

Если у вас есть вопросы по этому субъективному списку, не стесняйтесь написать [@VintaChen](https://twitter.com/VintaChen) в Twitter.
