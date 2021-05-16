#!/bin/bash

docker exec -it sb3-api ./node_modules/.bin/prisma migrate dev
