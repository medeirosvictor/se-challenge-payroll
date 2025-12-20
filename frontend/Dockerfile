FROM node:24

# Set work directory
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files first
COPY package.json pnpm-lock.yaml* ./

# Copy project files
COPY . .

# Expose port
EXPOSE 5173

# Start dev server with host flag to allow external connections
CMD pnpm install && pnpm dev --host 0.0.0.0