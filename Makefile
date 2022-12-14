lint:
	npx eslint --no-eslintrc --config .eslintrc.json --ext .ts,.tsx .

lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend