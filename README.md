# Watdefactuur - Portfolio Examen Project

### Eerste keer opstarten

1. Kopieer het bestand `.env.example` naar `.env`
2. Configureer je database instellingen in `.env`
3. Voer `composer install` uit
4. Voer `npm install` uit
5. Genereer een applicatiesleutel: `php artisan key:generate`
6. Draai de database migraties: `php artisan migrate:fresh --seed`
7. Start de Laravel server: `php artisan serve`
8. Start de frontend (in een tweede terminal): `npm run dev`

### Normaal opstarten

1. `php artisan serve`
2. `npm run dev`

## 📂 Project Structuur

Hieronder volgt een overzicht van de belangrijkste mappen in dit project:

- **`app/Http/Controllers`**: Bevat de controllers die de logica tussen de database en de views afhandelen.
    - `Admin/`: Controllers voor het beheerderspaneel.
    - `Pro/`: Controllers voor de zakelijke (Pro) gebruikers (facturen, klanten, producten).
- **`app/Models`**: De Eloquent modellen die de database tabellen representeren.
- **`database/migrations`**: Definities van de database schema's.
- **`resources/js/Pages`**: De React componenten die de verschillende pagina's van de applicatie vormen (Inertia.js).
    - `Admin/`: Pagina's voor systeembeheer.
    - `Pro/`: Pagina's voor de zakelijke functionaliteiten.
- **`resources/js/Components`**: Herbruikbare UI-componenten (zoals buttons, inputs, en de sidebar).
- **`resources/views/emails`**: Blade templates voor de e-mail notificaties.
- **`routes/`**: Definities van de web en API routes.
