# React Appointment MVP (Vite + Chakra UI)

## Setup
```bash
npm install
npm run dev
```

The dev server proxies `/api` to `http://localhost:8080`.

- Customer page: `/`
- Admin page: `/admin` (enter your admin key; sent as `X-Admin-Key`)

## TODO
- one appointment can have multiple services (can create separate appointments for now)
- check for new appointment date-time endpoint
- add estimated time column
- update mobile UI for mobile
- add headers
- add login id pwwd for admin
- add react hook form
- add support for from and to date in filters
- add icons
- we can have booking date, actual start time, actual end time
- update data in interval for admin so that he can know about new requests
- admin can enable/disable the appointment bookings
- pagination
- sorting
- edit appointment for admin
- companyId using useContext