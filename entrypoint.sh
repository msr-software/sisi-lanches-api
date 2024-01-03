#!/bin/sh
set -ex

npm run prisma:migrations

exec "$@"