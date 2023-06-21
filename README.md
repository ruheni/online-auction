# Online auction system

## Table of Contents

- [Introduction](#introduction)
- [Architecture](#architecture)
- [Features](#features)
- [Installation](#installation)
- [Technologies](#technologies)
- [Work in Progress](#work-in-progress)
- [Deployment](#deployment)
- [Checking for Expired Auctions](#checking-for-expired-auctions)

## Introduction

Online auction system where users can create and bid on items.

## Architecture

The application follows a Next.js Full-Stack architecture, utilizing various technologies to provide a robust and scalable solution. The key components of the architecture include:

- Next.js
- Next.js API Router (Backend)
- Vercel
- PostgreSQL
- Prisma ORM

The architecture combines the frontend and backend within the Next.js framework, enabling a seamless development experience. The frontend components are built using React and Next.js, while the backend logic is implemented using the Next.js API Router. The Vercel platform handles the deployment and hosting of the application.

This architecture provides a scalable and efficient solution for building and deploying full-stack Next.js applications, leveraging the power of serverless functions, a robust database, and a modern ORM.

## Features

1. Authentication
   - A user can register and use that to login.
2. Features

   - Deposit money.
   - Create a new item (name, started price and time window) in the draft state.
     - An item need to be published to start an auction.
   - Get the list of completed/ongoing bid items.
   - Can bid in each 5s and for published items (each user).

     - A new bid has to have a higher price than the current highest bid and started price.

     NOTE: This is not imlemented yet!

   - After bid time. fail auction user’s money need to be payback

3. Create a UI interface and integrate it with the API. Below is the sample wireframe.
   You don’t need to follow 100% of the wireframe, any good UI is welcome.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/riodel27/online-auction.git
   ```

2. Navigate to the project directory:

   ```bash
   cd online-auction
   ```

3. Install the dependencies:

   ```bash
   yarn
   ```

4. Configure the project:

   - Create a .env file in the root directory of the project.
   - Add the required environment variables and their values to the .env file. Refer to the .env.example file for the necessary variables.

5. Start the development server:
   ```bash
   yarn dev
   ```

## Technologies

- Next.js
- Prisma
- Vercel/postgres
- Vercel Deployment
- Shadcn ui

## Work in Progress

Please note that the application is currently under development and some features have not been implemented yet. The following features are planned for future updates:

- **After bid time**: In the current version, there is no mechanism to handle the expiration of auction time and refunding the money to the auction participants. This feature will be implemented to ensure that when the bid time elapses, the failed auction user's money is appropriately refunded.

- **Deposit for insufficient balance**: Currently, there is no functionality to ask for a deposit when users bid on items if their balance is not sufficient. This feature will be added to ensure that users are required to deposit additional funds if their account balance is not enough to cover their bids.

- **Display deposit balance in the header**: The header component does not currently display the deposit balance of the user. This information will be added to the header to provide users with visibility into their available deposit balance.

Please keep in mind that these features are part of the roadmap for future development and will be implemented in upcoming releases. We appreciate your understanding and patience as we continue to improve and enhance the application.

## Deployment

The app is deployed on Vercel and can be accessed at the following URL:

[Live Demo](https://online-auction-flax.vercel.app/)

Feel free to visit the link and explore the app!

## Gotchas

- **App Improvements**: Please note that while the app is functional, there is still room for improvement.
- **Next.js 13**: The current version of the app is developed using the new version of Next.js 13. As Next.js 13 is still new, there might be certain aspects that are subject to change. I amactively exploring and experimenting with the latest features and functionalities offered by Next.js 13.

## Checking for Expired Auctions

The application provides a mechanism to mark auctions as complete once they reach their specified time window or duration. Currently, a cron job scheduler is not implemented to automatically check for expired auctions. However, you can manually trigger the API route to perform the necessary updates.

To check for expired auctions and mark them as complete, follow these steps:

1. Access the API route responsible for handling expired auctions. The endpoint URL may vary depending on your application setup.

2. Make a GET request to the API route. This can be done using tools like cURL, Postman, or by visiting the URL directly in your browser.

   Example using cURL:

   ```
   curl -X GET https://your-domain.com/api/cron/auction
   ```

   Note: Replace https://your-domain.com with the actual URL of your application.

3. The API route will perform the necessary logic to identify auctions that have reached their time duration and update their status as complete.

Once a cron job scheduler is implemented, you can configure it to periodically trigger the API route automatically. This will ensure that expired auctions are marked as complete without the need for manual intervention.

Please note that this is a temporary solution until the cron job scheduler is implemented. Be sure to regularly check for expired auctions to keep the application up-to-date.

## Roadmap and Future Improvements

The following is a list of planned improvements and features for the project:

- [ ] Refactor the data fetching process for the homepage table.
- [ ] Implement real-time updates for the time duration.
- [ ] Enhance the UI/UX of the Bid Modal/Page.
- [ ] Implement an improved feature to reflect changes in the table after a successful bid.
- [ ] Enhance the validation for the bidding feature by prompting users to deposit funds if their balance is insufficient.
- [ ] Update the current price to the starting price if no bids have been placed yet on the homepage table.
- [ ] Improve the Deposit feature by displaying the user's balance in the header component and reflecting changes after a successful deposit.
- [ ] Enhance the "My Items" page, where item owners can view and edit their items before publishing.
- [ ] Implement real-time notifications for bidding, ensuring that all participating users are notified of any bids on an auction item.
- [ ] Integrate zustand state management.
