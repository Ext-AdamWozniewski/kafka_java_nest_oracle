install:
	docker compose build

start:
	docker compose up -d

stop:
	docker compose stop

dev-start:
	cd transformer && npm install
	cd seeder && npm install