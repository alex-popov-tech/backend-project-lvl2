install:
	npm install
publish:
	npm publish --dry-run
lint:
	npx eslint src
test:
	npm test
test-watch:
	npx jest --watch
