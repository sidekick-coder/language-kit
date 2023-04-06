#!/usr/bin/env sh

# abort on errors
set -e

rm -rf dist

# build
BASE_URL=/study-03-markdown-language-parser/ npm run build
REPO_URL=git@github.com:zzhenryquezz/study-03-markdown-language-parser.git

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git remote add origin $REPO_URL
git add .
git commit -m "deploy `date +%d-%m-%Y" "%H:%M:%S`"
git branch -M gh-pages

git push -f $REPO_URL gh-pages

cd -
