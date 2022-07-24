Основные команды

cls - очистить
dir - показать текущие файлы
cd.. - вернутся назад в папкуchhe"che
cd "название папки"/  - переход в папку

git init - Позволяет проинициализировать репозиторий в текущей папке

git status - Показывает текущий статус

git add - Отслеживает изменения файлов

git add index.html — добавляет index.html
git add . — добавляет все файлы
git commit - Сохраняет изменения в коммит

git commit -m 'commit message' — создает коммит с сообщением
git branch - Работа с ветками в репозитории

git branch — показывает список веток
git branch branch-name — создает новую ветку branch-name
git branch -D branch-name — удаляет ветку branch-name
git checkout - Переключается на другую ветку

git checkout branch-name — переключается на последний коммит в ветке branch-name
git checkout -b branch-name — создает и переключается на ветку branch-name
git merge - Совмещает текущую ветку с выбранной

git merge branch-name — совмещает текущую ветку с branch-name
git config - Конфигурация и параметры git

git config --global user.name — Показывает имя пользователя
git config --global user.name 'new user' — Изменяет имя пользователя
git config --global user.email — Показывает email пользователя
git config --global user.email 'test@mail.ru' — Изменяет email пользователя
git push - Заливает текущие локальные коммиты в удаленный репозиторий

git pull - Забирает изменения с удаленного репозитория в локальный

git clone - Клонирует проект с удаленного репозитория


если не все ветви отобразились:

- git remote set-branches origin '*'
- git fetch -v
- git checkout the-branch-i-ve-been-looking-for





1. Получаем хэш-код коммита, к которому хотим вернуться.
2. Заходим в папку репозитория и пишем в консоль:

    $ git reset --hard a3775a5485af0af20375cedf46112db5f813322a 
    $ git push --force

//////////////////////////////////////////////////////////////

…or create a new repository on the command line

echo "# turnkey-solution" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin   https://github.com/V-Svistunova/turnkey-solution.git
git push -u origin main


///////////////////////////////////////////////////////////////

…or push an existing repository from the command line

git remote add origin https://github.com/V-Svistunova/turnkey-solution.git
git branch -M main
git push -u origin main

///////////////////////////////////////////////////////////////

Контент скрыт утилитарным классом visually-hidden, чтобы он был доступен для скринридеров и поисковиков:

/* Хорошо */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
<h2 class="visually-hidden">Заголовок</h2>

/* Плохо */
h1 {
  font-size: 0;
}

.title {
  display: none;
}