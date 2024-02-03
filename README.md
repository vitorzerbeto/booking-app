# Booking App

A basic booking experience.

## Stack

- Vite
- React + TS
- Styled Components

## Requirements

### Business Rules

> _"A booking is when a guest selects a start and end date and submits a reservation on a property"_.

- [ ] Store the state from bookings in a global state store
- [ ] Prevent double (overlapping) bookings.
- [ ] Validate the start and end dates for a booking.
- [ ] Responsive for desktop and mobile.

### Technologies

- [ ] Tests
- [ ] Documentation
- [x] Use Vite.js
- [x] Use Typescript
- [x] Use Styled Components
- [ ] Error Handling

## Setup

To run this project, is recommended to use the Node version `v21.5.0`.

If you are familiar with `nvm`, this project contains a `.nvmrc` file. So just run the following command to use the correct Node version:

```
nvm use
```

To install the dependencies and run the commands, use [pnpm](https://pnpm.io/installation):

```
pnpm i
```

The following commands are available in this project:

```javascript
// Run the project on development mode
pnpm dev

// Run ESlint validation
pnpm lint

// Build the application
pnpm build

// Run builded application
pnpm preview
```
