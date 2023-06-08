#!/usr/bin/env sh

# abort on errors
set -e

# nuxt env vars
# NUXT_PUBLIC_API_BASE=https://sidekick-coder.github.io/language-kit/
BASE_URL=/language-kit/
# NUXT_APP_CDN_URL=https://sidekick-coder.github.io/language-kit/

# github repo url
REPO_URL=git@github.com:sidekick-coder/language-kit.git

# set runing dir with script
cd `dirname $0`

# build
BASE_URL=$BASE_URL npm run generate

touch .output/public/.nojekyll

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