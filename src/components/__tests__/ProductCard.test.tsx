import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { useStore } from '@/store/store';

jest.mock('@/store/store', () => ({
  useStore: jest.fn(() => ({
    addToCart: jest.fn(),
    cart: []
  }))
}));

const mockProduct = {
  id: 1,
  slug: 'test-product',
  name: 'Test Product',
  price: 19.99,
  description: 'Test description',
  image: '/test.jpg',
  category: 'electronics',
};

describe('ProductCard', () => {
  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product');
  });

  it('calls addToCart when button is clicked', () => {
    const mockAddToCart = jest.fn();
    (useStore as jest.Mock).mockImplementation(() => ({
      addToCart: mockAddToCart,
      cart: []
    }));
    
    render(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});