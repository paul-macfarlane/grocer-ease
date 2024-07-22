# grocery-list

## Summary

The purpose of this app is to make grocery for me and my girlfriend easier. This is a successor to https://github.com/paul-macfarlane/grocery-list, which was working fine but I wanted to stop rolling my own UI components and decided to
re-architect the app a bit to better support collaboration on lists.

## Feature List

- [x] authentication
  - [x] users can log in with social accounts
    - [x] add protected routes, add sign out, get session info in request
    - [x] add cleaner styling for login and root page
- [ ] profile management
  - [x] users start of with automatically generated usernames
  - [ ] users can edit their usernames
- [ ] creating/editing a grocery list
  - [ ] items can be created, edited, and deleted and include name, quantity, notes, and link. Only name is required
  - [ ] lists can have budgets
- [ ] advanced grocery lists
  - [ ] items can be grouped
  - [ ] they can also be copied/duplicated to a new list
  - [ ] items can have substitutes when the item is not available
  - [ ] list form validation (server side errors and client side handling)
  - [ ] autosave/debouncing
    - [ ] change ids to uuids (will make client easier to manage since ids can be generated client side and new items can have known ids
    - [ ] remove the "upsert" nature of the form. Instead when a user creates a list open a modal to give a new list title, and then submit and open the form in edit view
    - [ ] for existing lists, debounce all changes into a "draft" state and then have the user publish, this will be useful later on for collaborative lists to warn users about conflicting changes
- [ ] executing a grocery list
  - [ ] a user can enter an interactive ui execute the list
  - [ ] mark items as complete
  - [ ] skip items
  - [ ] replace items
  - [ ] user can still edit/add to the list during execution
  - [ ] lists can be recurring
- [ ] sharing grocery lists
  - [ ] users can send lists to other users
  - [ ] lists can be collaborative, meaning that users can edit other users lists. this will probably need some thought in design
  - [ ] users can add "grocery buddies" to send/share grocery lists
- [ ] non-functional related work
  - [x] migrate from PostgreSQL to Turso for cheaper db hosting in the future
  - [ ] automated testing
  - [ ] host the application on the web

## Local Setup

This app is built using [Node.js](https://nodejs.org/en), [SvelteKit](https://kit.svelte.dev/) (with release candidate for [Svelte 5](https://svelte.dev/blog/svelte-5-release-candidate)), [Drizzle ORM](https://orm.drizzle.team/), and [Turso](https://turso.tech/).

1. Set up Google OAuth 2.0 https://developers.google.com/identity/protocols/oauth for this app using the local host url http://localhost:5173/auth/google/callback as a redirect URI, obtain credentials, and set them as env vars in `.env`.
2. [Install Turso CLI](https://docs.turso.tech/cli/introduction)
3. Create a local db file using `turso dev --db-file local.db` (keep the process running)
4. Copy `env.example` to `.env` - `cp .env.example .env` and fill in values as needed
5. Install LTS version of [Node.js](https://nodejs.org/en).
6. Install node dependencies `npm i`
7. Setup db schema by running `npm run db:migrate`
8. Run application using `npm run dev`
