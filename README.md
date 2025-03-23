# EazyBuy

EazyBuy is a collaborative e-commerce platform developed to provide a seamless shopping experience for electronic products. This repository contains the full-stack codebase, encompassing both the client-side and server-side components, built with modern web technologies to ensure responsiveness, performance, and scalability.

## Features

- **Product Catalog**: Browse and explore a wide range of electronic products.
- **Product Details**: View detailed information and customer reviews for each product.
- **User Authentication**: Secure registration and login functionalities.
- **Shopping Cart**: Add products to the cart, update quantities, and proceed to checkout.
- **Order Management**: Track and manage your orders efficiently.
- **Payment Integration**: Secure payment processing for a smooth transaction experience.
- **Responsive Design**: Optimized for various devices to ensure a seamless shopping experience.

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/) with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux](https://redux.js.org/)
- **API Requests**: [React Query](https://react-query.tanstack.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Backend**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **ORM**: [Prisma](https://www.prisma.io/) for database interactions

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (for local development)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ehmasuk/eazybuy.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd eazybuy
   ```

3. **Install dependencies for both client and server**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

4. **Set up environment variables**:

   - Rename the `.env.example` file to `.env.local`.
   - Add necessary environment variables, such as database connection strings and API keys.

5. **Run database migrations**:

   ```bash
   npx prisma migrate dev
   ```

### Development

To start the development server:

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To build the application for production:

Using npm:

```bash
npm run build
```

Or using yarn:

```bash
yarn build
```

This will generate an optimized build in the `.next` directory.

### Starting the Production Server

After building the application, you can start the production server:

Using npm:

```bash
npm start
```

Or using yarn:

```bash
yarn start
```

## Project Structure

- `client/`: Contains the client-side application components and pages.
- `server/`: Contains the server-side application code and API endpoints.
- `components/`: Reusable UI components.
- `helpers/`: Utility functions and helpers.
- `hooks/`: Custom React hooks.
- `prisma/`: Prisma schema and migrations.
- `public/`: Static assets like images and fonts.
- `redux/`: Redux store and slices.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

Please ensure your code adheres to our coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/): React framework for server-side rendering and static site generation.
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for styling.
- [Prisma](https://www.prisma.io/): Next-generation ORM for Node.js and TypeScript.
- [Redux](https://redux.js.org/): Predictable state container for JavaScript apps.
- [React Query](https://react-query.tanstack.com/): Data-fetching library for React applications.

