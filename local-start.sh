#!/bin/bash -e

docker-compose down

if [ -z "$1" ]; then
	sudo rm -rf db-data
elif [ "$1" != "--keep-data" ]; then
	echo Bad argument! Try --keep-data
	exit 1
fi

if [ -z "$2" ]; then
	docker-compose -f docker-compose.yml up --build
elif [ "$2" == "--background" ]; then
	docker-compose -f docker-compose.yml up --build -d
else
	echo Bad argument! Try --background
	exit 1
fi
