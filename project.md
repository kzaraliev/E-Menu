# e-menu.bg – SaaS Platform for Digital Restaurant Menus

## 🧠 Project Overview

**e-menu.bg** is a SaaS platform designed to help restaurants create and manage their digital menus easily. The goal is to provide a simple and user-friendly admin panel where restaurant owners can set up and customize their online menu without any technical knowledge.

Each registered restaurant gets a public page hosted under the domain:  
**`e-menu.bg/{restaurant-name}`**

The system is subscription-based and includes useful features such as auto-population of menus via scanned images.

---

## 💡 Key Features

- ✅ Custom public page for each restaurant: `e-menu.bg/{restaurant-slug}`
- ✅ Admin panel for managing restaurant info, menu categories, items, and images
- ✅ Subscription payment flow using Stripe
- ✅ Supabase as backend (auth, DB, storage)
- ✅ Automatic menu population from image scans (OCR)
- ✅ Responsive, mobile-friendly UI for both admin and public views

---

## 🧱 Technologies Used

| Layer             | Stack                                        |
|------------------|----------------------------------------------|
| Frontend         | Next.js (App Router, Server Components)      |
| Styling          | Tailwind CSS                                 |
| Auth             | Supabase Auth                                |
| Backend (DB/API) | Supabase (PostgreSQL, Edge Functions)        |
| Payments         | Stripe (subscription-based billing)          |
| Image Storage    | Supabase Storage                             |
| OCR              | Tesseract.js (client-side) or Supabase Edge Function w/ Python |

---

## 🗂 Project Structure (Planned)

/app
/dashboard → admin panel (protected routes)
/[restaurant] → public menu pages
/login → authentication
/lib
supabase.ts → Supabase client
stripe.ts → Stripe setup
/components
/admin → menu forms, upload components
/public → menu view for visitors
/ui → buttons, inputs, layout components
/supabase
/migrations → DB schema as SQL files


---

## 🛠 Database Schema (Initial)

Using Supabase's PostgreSQL with the following main tables:

### `restaurants`

| Field       | Type      | Description                      |
|-------------|-----------|----------------------------------|
| id          | UUID      | Primary key                      |
| name        | text      | Name of the restaurant           |
| slug        | text      | Unique URL slug                  |
| owner_id    | UUID      | References auth.users            |
| created_at  | timestamp | Timestamp                        |

### `categories`

| Field         | Type      | Description                      |
|---------------|-----------|----------------------------------|
| id            | UUID      | Primary key                      |
| name          | text      | Category name (e.g. Starters)    |
| restaurant_id | UUID      | FK to `restaurants`              |

### `menu_items`

| Field          | Type | Description                                |
| -------------- | ---- | ------------------------------------------ |
| id             | UUID | Primary key                                |
| name           | text | Base name of the product                   |
| description    | text | Optional description                       |
| image\_url     | text | Supabase storage                           |
| category\_id   | UUID | FK to `categories`                         |
| restaurant\_id | UUID | FK to `restaurants` (redundant but useful) |

### `menu_item_variants`

| Field          | Type    | Description                         |
| -------------- | ------- | ----------------------------------- |
| id             | UUID    | Primary key                         |
| menu\_item\_id | UUID    | FK to `menu_items`                  |
| name           | text    | Variant name (e.g. Small, Medium)   |
| price          | numeric | Price for this variant              |
| is\_default    | boolean | Whether this is the default variant |


---

## 🔐 Authentication

- Supabase Auth (email/password)
- Each user owns one or more restaurants
- Protected admin routes using Supabase session/context

---

## 💳 Payment Flow

- Implemented via Stripe
- Monthly subscription plans (e.g. Basic, Pro)
- Webhook integration to enable/disable dashboard access

---

## 📸 OCR Feature – Auto Menu Population

- When onboarding, the user can upload a photo of an existing printed menu
- OCR (Optical Character Recognition) will extract text using:
  - OpenAI API 
- This is for future development

---

## 🧪 MVP Priorities

1. User registration & authentication (Supabase)
2. Restaurant creation + menu editing from admin panel
3. Stripe subscription system
4. Public menu pages
5. Basic mobile responsive layout
6. OCR image-to-menu flow (MVP version)

---

## 🧭 Next Steps

- [ ] Set up Supabase project & schema with CLI
- [ ] Create Next.js project structure
- [ ] Implement auth flow and protected dashboard
- [ ] Integrate Stripe subscription + webhooks
- [ ] Design public-facing restaurant page layout
- [ ] Implement image upload + OCR prototype
- [ ] Launch MVP

---

## 📝 Naming & Branding Notes

- Domain: **e-menu.bg**
- Possible slogans:
  - “Your restaurant, your digital menu.”
  - “Easy, elegant menus in minutes.”

---

## 📌 Long-Term Goals

- Add multilingual support
- Enable QR code generation for each menu
- Analytics for views or best-selling items
- Theme customization for each restaurant
- Table ordering integration (advanced)

---

