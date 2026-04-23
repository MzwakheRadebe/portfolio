# City Center Trade — C2C Marketplace

A consumer-to-consumer marketplace for South African buyers and sellers, inspired by Gumtree and Facebook Marketplace. Built and deployed to production with real users.

**Live:** [citycenterTrade.infinityfreeapp.com](https://cityCenterTrade.infinityfreeapp.com)

---

## Features

- **Multi-image listings** — sellers can upload multiple photos per listing, validated server-side by real image content (not just file extension)
- **Real-time messaging** — buyers and sellers communicate directly within the platform
- **Seller dashboard** — live view tracking, listing management, and message inbox
- **Category browsing** — listings organised by category for easy discovery
- **Secure authentication** — session-based login and registration
- **SQL injection prevention** — all queries use prepared statements
- **HTTPS enforcement** — configured via `.htaccess` on the production server
- **Live deployment** — fully operational on InfinityFree shared hosting

## Tech stack

| Layer | Technology |
|-------|------------|
| Backend | PHP |
| Database | MySQL |
| Frontend | HTML, Tailwind CSS, JavaScript |
| Hosting | InfinityFree |
| Security | Prepared statements, server-side file validation, HTTPS via .htaccess |

## Screenshots

*(Add screenshots of the homepage, listing page, messaging UI, and seller dashboard)*

## Security highlights

File uploads are validated by checking the actual image content (using `getimagesize()` or equivalent), not just the MIME type or file extension. This prevents disguised file uploads. All database interactions use prepared statements to block SQL injection.

## Running locally

```bash
# Requirements: PHP 7.4+, MySQL

# Clone the repo
git clone https://github.com/MzwakheRadebe/city-center-trade.git
cd city-center-trade

# Import the database schema
mysql -u root -p < database/schema.sql

# Copy and configure environment
cp config.example.php config.php
# Add your database credentials to config.php

# Start a local PHP server
php -S localhost:8000
```

## Contact

Built by [Mzwakhe Radebe](https://github.com/MzwakheRadebe)
