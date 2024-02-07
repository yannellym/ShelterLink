import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

const PetCard = require('../PetCard');

describe('PetCard component', () => {
  const mockPet = {
    id: '1',
    name: 'Buddy',
    type: 'Dog',
    breeds: {
      primary: 'Labrador Retriever',
    },
    gender: 'Male',
    age: 'Adult',
    size: 'Large',
    contact: {
      address: {
        city: 'New York',
        state: 'NY',
      },
    },
    description: 'A friendly dog looking for a loving home.',
  };

  it('renders pet information correctly', () => {
    render(<PetCard pet={mockPet} />);
    
    expect(screen.getByText('Buddy')).toBeInTheDocument();
    expect(screen.getByText('Labrador Retriever')).toBeInTheDocument();
    expect(screen.getByText('📍New York, NY')).toBeInTheDocument();
    expect(screen.getByText('Adult | Male | Large | Labrador Retriever')).toBeInTheDocument();
    expect(screen.getByText('A friendly dog looking for a loving home.')).toBeInTheDocument();
  });

  it('displays placeholder image if pet has no photo', async () => {
    render(<PetCard pet={mockPet} />);
    const placeholderImage = await screen.findByAltText('Buddy');

    expect(placeholderImage.src).toContain('coming_soon.png');
  });

  it('calls handleMoreInfoClick when "More Info" button is clicked', () => {
    const handleMoreInfoClick = jest.fn();
    render(<PetCard pet={mockPet} handleToggleFavorite={jest.fn()} />);
    const moreInfoButton = screen.getByText('More Info');
    fireEvent.click(moreInfoButton);

    expect(handleMoreInfoClick).toHaveBeenCalled();
  });

  it('calls handleToggleFavoriteClick when favorite button is clicked', () => {
    const handleToggleFavoriteClick = jest.fn();
    render(<PetCard pet={mockPet} handleToggleFavorite={handleToggleFavoriteClick} />);
    const favoriteButton = screen.getByLabelText('favorite-heart-unfavorited');
    fireEvent.click(favoriteButton);

    expect(handleToggleFavoriteClick).toHaveBeenCalled();
  });
});
