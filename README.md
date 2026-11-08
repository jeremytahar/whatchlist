# Whatchlist

Application Angular pour suivre les films, séries, animés et jeux qu'on veut voir ou qu'on a déjà vus. On peut chercher un titre dans la base OMDb, l'ajouter à sa liste, ou le créer à la main, puis le noter, changer son statut (à voir, en cours, terminé), le modifier ou le supprimer.

Projet final du cours Angular Week (Mastère IIM).

## Fonctionnalités

- Liste filtrable par statut et triable par date d'ajout ou par note, avec les états chargement, erreur et liste vide.
- Recherche de titres via l'API OMDb, avec ajout en un clic.
- Formulaire réactif (création et modification) avec validation et messages d'erreur visibles, et lien optionnel vers une image de couverture.
- Page de détail d'un titre, avec notation par étoiles.
- Données persistées avec json-server (CRUD complet).

## Pages (routes)

| Route | Page |
| --- | --- |
| `/` | Ma liste |
| `/watchlist/search` | Recherche OMDb |
| `/watchlist/new` | Ajouter un titre à la main |
| `/watchlist/:id` | Détail d'un titre (paramètre `id`) |
| `/watchlist/:id/edit` | Modification d'un titre |

## Installation

Prérequis : [Node.js](https://nodejs.org/) et [pnpm](https://pnpm.io/).

1. Récupérer le projet et installer les dépendances :

   ```bash
   pnpm install
   ```

2. Créer sa clé d'API OMDb gratuite sur [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx).

3. Copier le fichier d'exemple de clé, puis y coller sa clé (le fichier `key.ts` est ignoré par git, il ne doit jamais être commité) :

   ```bash
   cp src/app/omdb/key.example.ts src/app/omdb/key.ts
   ```

   Dans `src/app/omdb/key.ts`, remplacer la chaîne vide par ta clé : `export const apiKey = 'ta-clé';`

## Lancer l'application

Il faut deux terminaux, un pour l'API et un pour l'application :

```bash
# Terminal 1 : API json-server sur http://localhost:3001
pnpm api

# Terminal 2 : application sur http://localhost:4200
pnpm start
```

Les données sont enregistrées dans le fichier `db.json`.

## Build

```bash
pnpm build
```

Les fichiers de production sont générés dans le dossier `dist/`.

## Utilisation de l'IA

Pour ce projet j'ai utilisé Claude Sonnet 5.5 du début à la fin, mais pas pour qu'il fasse le projet à ma place. Je l'ai pris comme un assistant qui m'aide à apprendre Angular, une techno que je ne connaissais pas du tout avant le cours.

### La règle que j'ai posée dès le début

Tout au début de la conversation, j'ai dit à Claude que je ne voulais pas qu'il me donne du code, sauf si je lui en demandais explicitement. À la place, je voulais qu'il m'explique avec des mots comment procéder, étape par étape, en me donnant des indices. Au final, je n'ai jamais eu besoin de lui demander de code : j'ai écrit moi-même mes composants, mon service, mes routes et mon formulaire.

### Le contexte que je lui ai donné

Pour que Claude sache ce que j'avais à faire, je lui ai donné les slides du cours et les slides qui présentent le projet. Comme ça, les indices qu'il me donnait ne reposaient que sur des notions qu'on avait vues en cours. Je n'avais pas à subir des concepts ou des façons de faire que je n'aurais même pas compris, comme ça arrive quand on vibecode complètement.

### Quand je bloquais

Quand je ne comprenais pas quelque chose, je demandais à Claude de me l'expliquer le mieux possible, parfois en le comparant à du JavaScript classique ou à React, que je connais mieux. L'objectif était de comprendre ce que je produisais, pas juste de faire marcher le code. Quand je faisais une erreur, il m'indiquait où chercher plutôt que de corriger à ma place.

### La partie visuelle

À la fin, toute la partie fonctionnelle et l'affichage marchaient, mais l'application ne ressemblait à rien parce qu'il n'y avait pas de CSS. J'ai alors connecté mon dossier de projet à ma session Claude et je lui ai écrit que l'application était fonctionnelle mais très brute visuellement, et que je voulais qu'il repasse sur la disposition des éléments, sur le naming et sur le style.

Il m'a ensuite listé les fichiers qu'il avait modifiés. J'ai vérifié que ma logique TypeScript n'avait pas été réécrite : il a surtout touché au HTML et au CSS, avec seulement quelques petits ajouts en TypeScript (les libellés en français, le survol des étoiles, le champ pour l'image de couverture). Je lui ai ensuite demandé trois ou quatre retours visuels à corriger, et le projet était terminé.

### Ce que j'en retiens

C'était la première fois que j'utilisais l'IA de cette manière : comme un assistant qui m'explique les choses sans me donner le code tout fait. Ça m'a vraiment permis d'apprendre Angular. Ça m'a aussi redonné le sentiment d'apprendre réellement le développement web, que je ne retrouvais plus quand je vibecodais. C'est une méthode que je réutiliserai désormais pour tous mes projets.

---

## Documentation générée par Angular CLI

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
