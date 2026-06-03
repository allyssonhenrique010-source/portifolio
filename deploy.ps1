cd "C:\Users\Allysson\Documents\portifolio"
git init
git config user.email "allyssonhenrique010@gmail.com"
git config user.name "Allysson Henrique"
git add .
git commit -m "Primeiro deploy do portfólio"
git branch -M main
git remote add origin https://github.com/allyssonhenrique010-source/portifolio
git push -u origin main