import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { useStore } from '@/store/store';
import { useRouter } from 'next/navigation';

jest.mock('@/store/store');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product');
  });

  it('calls addToCart when button is clicked', () => {
    const mockAddToCart = jest.fn();
    (useStore as unknown as jest.Mock).mockReturnValue({ 
      addToCart: mockAddToCart,
      cart: []
    });
    
    render(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('navigates to product page when clicked', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByText('Test Product'));
    
    expect(mockPush).toHaveBeenCalledWith('/product/test-product');
  });
});