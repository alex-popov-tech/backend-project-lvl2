install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint src
test:
	npx jest
test-watch:
	npx jest --watch
