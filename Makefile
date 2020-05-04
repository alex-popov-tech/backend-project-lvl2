install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint src
test:
	npx jest
test-coverage:
	npx jest --coverage
test-watch:
	npx jest --watch
