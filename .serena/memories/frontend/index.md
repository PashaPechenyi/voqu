# Frontend rules index (`apps/web`)

The frontend rules are split into focused files. **Read the one(s) matching your task** — each is
self-contained. This index is the map; don't put rules here.

| When you're…                                                                                 | Read                         |
| -------------------------------------------------------------------------------------------- | ---------------------------- |
| placing a new file, naming a file, deciding import direction                                 | `mem:frontend/architecture`  |
| writing a component, hook, type, helper, const, or enum (the everyday "how do I write this") | `mem:frontend/conventions`   |
| adding or touching an API request                                                            | `mem:frontend/data-fetching` |
| building a form, modal, or page section; wiring state; deciding who owns a hook              | `mem:frontend/state-forms`   |
| styling anything (MUI / `sx`)                                                                | `mem:frontend/styling`       |
| adding a route or nav link                                                                   | `mem:frontend/routing`       |
| needing product/domain context                                                               | `mem:project-overview`       |

Formatting (quotes, semicolons, line length, trailing commas) is controlled by Prettier + ESLint —
don't argue with them; fix the config if a rule is wrong.

## TL;DR (the rules that bite most often)

- **Components:** arrow `const` typed `FC<Props>`, `export default`; everything else is a named
  export. Props type is `<Component>Props` (a `type`). No `any`. → `mem:frontend/conventions`
- **Events:** emitted props start with `on`; local handlers start with `handle`. Success callbacks
  are `on<Verb>Success`. → `mem:frontend/conventions`
- **Vocabulary:** one word per concept — **update** (not edit), **create** (not add), **delete** (not
  remove), and **never `fetch` in a name**. → `mem:frontend/conventions`
- **API requests:** always through `httpClient` + `useMutation` (`@/shared/api`); never hand-roll
  `try/catch` + `isLoading`/`error`. `*Req` functions live in `features/<entity>/api/`, types are
  `<Name>DTO` / `<Name>BodyDTO`. Call `useMutation` inline by default; extract a hook only on reuse.
  → `mem:frontend/data-fetching`
- **Single responsibility:** a component renders UI and emits events; cards/items emit events,
  modals/sections may own a hook. → `mem:frontend/state-forms`
- **MUI:** multi-line/repeated `sx` → `sxStyles` via `createSxStylesList`; theme tokens, no hardcoded
  hex/px. → `mem:frontend/styling`
- **File placement:** entity-bound → `features/<entity>/`; generic → `shared/`; page-local →
  co-locate. Imports flow `pages → features → shared`, one way. → `mem:frontend/architecture`

## Definition of done (every frontend change)

- `npx tsc --noEmit` is clean.
- `npm run lint` is clean.
- You opened the page in a browser and walked the golden path of the feature.
