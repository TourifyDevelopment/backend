#!/bin/bash

#GREEN='\033[1;32m'
GREEN='\033[0;32m'
RED='\033[0;31m'
WHITE='\033[0;37m'
RESET='\033[0m'


cd backend
echo -e "${GREEN}[DEPLOY]${RESET} Stopping docker container..."
sudo ${DOCKER_CONFIG}/cli-plugins/docker-compose stop
cd ..


echo -e "${GREEN}[DEPLOY]${RESET} Do you really want to remove the backend and make a clean install? y/n "
read choice
if [[ $choice == n* ]]; then
    echo -e "${GREEN}[DEPLOY]${RESET} Exiting..."
    exit
fi


echo -e "${GREEN}[DEPLOY]${RESET} Removing current backend..."
sudo rm -rf backend

echo -e "${GREEN}[DEPLOY]${RESET} Cloning backend "
git clone https://github.com/TourifyDevelopment/backend.git
cd backend

echo -e "${GREEN}[DEPLOY]${RESET} Last commit: "
git log --oneline HEAD^..HEAD

echo -e "${GREEN}[DEPLOY]${RESET} Renaming env file... "
mv .env.sample .env


echo -e "${GREEN}[DEPLOY]${RESET} Delete old containers (data in mongodb)? y/n "
read choice
if [[ $choice == y* ]]; then
    echo -e "${GREEN}[DEPLOY]${RESET} Deleting containers... "
    sudo ${DOCKER_CONFIG}/cli-plugins/docker-compose rm -f
fi

echo -e "${GREEN}[DEPLOY]${RESET} Starting containers... "
sudo ${DOCKER_CONFIG}/cli-plugins/docker-compose build
sudo ${DOCKER_CONFIG}/cli-plugins/docker-compose up -d