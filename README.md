## First startup

1. Kopieer het bestand `.env.example`
2. Hernoem het gekopieerde bestand naar `.env`
3. Voer `composer install` uit
4. Voer `npm install` uit
5. Genereer een applicatiesleutel met `php artisan key:generate`
6. Draai de database migraties met `php artisan migrate:fresh`
7. Start de Laravel server met `php artisan serve`
8. Open een tweede terminal en start de frontend met `npm run dev`

## Normal startup
1. Start de Laravel server met `php artisan serve`
2. Open een tweede terminal en start de frontend met `npm run dev`