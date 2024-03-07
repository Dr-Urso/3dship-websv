cd ./frontend/new
start powershell { pnpm dev }
cd ../../shipmgr/.venv/Scripts
./activate
cd ../..
python manage.py migrate
python manage.py runserver