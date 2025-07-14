
Mini-Commerce E-Shop Prototype

A modern e-commerce prototype built with Next.js 14 featuring product browsing, cart management, and checkout flow.


Features

Core Functionality
- Product Catalog - Browse 8+ products with images, prices, and descriptions
- Cart Management - Add/remove items, adjust quantities, view totals
- Checkout Flow - Mock payment process with order confirmation
- State Persistence - Cart saved to localStorage survives page reloads

Technical Implementation
- Next.js 14 (App Router) with TypeScript strict mode
- State Management - Zustand with localStorage persistence
- Data Fetching - React Query for product data caching
- Styling - Tailwind CSS with dark mode support
- Testing - Jest component tests + Playwright E2E tests

Project Structure

src/
 app/                Next.js route handlers
 components/         Reusable UI components
 data/               Product JSON data
 hooks/              Custom hooks
 providers/          Context providers
 store/              Zustand store configuration
 styles/             Global CSS/Tailwind config


 Key Technical Decisions

 --State Management
  typescript
 Example Zustand store with persistence
const useStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) => set((state) => ({...})),
      // ...other actions
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

--Data Fetching
typescript
// React Query implementation
const { data: products, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 1000 * 60 * 5 // 5 minute cache
});


-- Testing Strategy
- Component Tests: Jest + Testing Library
  typescript
  test('adds product to cart', () => {
    render(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalled();
  });
  
  
- E2E Tests: Playwright
  typescript
  test('checkout flow', async ({ page }) => {
    await page.goto('/cart');
    await page.getByText('Checkout').click();
    await expect(page).toHaveURL(/checkout/);
  });
  

-- SEO & Performance
- Optimized metadata with Next.js Metadata API
- Semantic HTML5 markup
- Responsive image loading with next/image


 Error Handling
- Graceful UI states for:
  - Product loading errors
  - Empty cart
  - Invalid routes
- Error boundaries for React components

-- Development Setup

1. Install dependencies:

npm install


2. Run development server:

npm run dev


3. Run tests:

-- Component tests
npm test

-- E2E tests
npx playwright test

