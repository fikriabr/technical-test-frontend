# React + TypeScript + Vite

This repository contains a React application scaffolded with Vite and TypeScript.

## Running the application

1. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```
2. Start development server:
   ```bash
   npm run dev
   # open http://localhost:5173 in your browser
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

> The project relies on Vite for fast bundling and HMR, with TypeScript ensuring type safety.

## Architecture Overview

The codebase is organized in a feature‑oriented structure under `src/`:

- `api/` – service modules for HTTP requests (vehicle, trip, routes, etc.) using a shared `httpClient`.
- `components/` – reusable React components such as cards, modals, map, pagination, filters, and loading indicators.
- `hooks/` – custom React hooks (`useVehicles`, `useLoopApi`) encapsulating data fetching and state logic.
- `constants/`, `interfaces/`, and `utils/` – shared constants, TypeScript interfaces, and helper utilities (formatters, page range calculations).

The application follows a simple client‑side architecture: components call hooks which interact with services, all typed via interfaces. Tailwind CSS is used for styling, configured through `tailwind.config.js`.

### Key implementation details

- **Data fetching** – All HTTP requests are handled by `axios` via a shared `httpClient` (`src/api/httpClient.ts`). Services such as `vehicleService`, `tripService`, and `routeService` expose async functions (`getVehicles`, etc.) that call `httpClient.get` with query parameters and return typed responses. An interceptor standardizes error handling.

- **UI construction** – The interface is built with plain React functional components and styled entirely using Tailwind CSS utility classes (plus the `classnames` helper). There is no external UI library; components like cards, modals, dropdowns and maps are custom.

- **Pagination** – Custom pagination is implemented in `src/components/Pagination.tsx`. It computes page ranges via the `getPaginationRange` utility (`src/utils/pageRange.ts`), exposes first/prev/next/last controls, and allows selecting a page size. State is managed in the consuming hook/component and passed as props.

---

## Requirements Coverage

This project was developed to meet the **Frontend Engineer Transjakarta – Sistem Manajemen Armada** technical test. All requested features are implemented as follows:

1. **Fetch vehicle data via REST API**
   - Uses MBTA Vehicle API (`/vehicles` endpoint) with query parameters for offset, limit, route, and trip.
   - Implemented in `src/api/vehicleService.ts`; returns typed `APIResponse<VehicleResource>`.
   - Error handling and loading states via custom hooks (`useVehicles`) and interceptors.

2. **Display vehicle data as cards with pagination**
   - Vehicle cards (`src/components/VehicleCard.tsx`) show label, status, coordinates, and last update.
   - Grid layout in `VehicleWrapper` component (not shown previously but part of src).
   - Pagination component shows range, total count, page size select, and navigation controls.

3. **Filter vehicles by route and trip**
   - Dropdown filters load route/trip options from their respective APIs using infinite scroll pattern.
   - Multiple selections allowed; values passed to `getVehicles` as query parameters.

4. **Show vehicle detail in popup**
   - Clicking a card opens `VehicleModal` displaying full vehicle attributes, route/trip info, and optional map (Leaflet).
   - Includes loading indicator and error handling if fetch fails.

5. **Extras & UX requirements**
   - Loading indicators shown on pages/popups during data fetches (`src/components/Loading.tsx`).
   - User‑friendly error messages surfaced via state and alert components.
   - Entire codebase written in **TypeScript** (bonus requirement).

Based on Vite, ESLint, and PostCSS configurations provided out of the box.
