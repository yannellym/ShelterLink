import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import PetCard from "../PetCard"; 


// Mocking the API module
jest.mock('aws-amplify', () => ({
    API: {
      graphql: jest.fn(),
    },
    graphqlOperation: jest.fn(),
  }));
  
  // Sample pet data for testing
  const samplePet = {
    id: '1',
    name: 'Sample Pet',
    age: 'Adult',
    gender: 'Male',
    size: 'Medium',
    breeds: {
      primary: 'Bulldog',
    },
    description: 'This is a sample pet for testing.',
    contact: {
      address: {
        city: 'Sample City',
        state: 'CA',
      },
    },
  };
  
  // Mocking the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ url: 'https://sample-image.com' }),
    })
  );
  
  describe('PetCard', () => {
    test('renders pet card correctly', async () => {
      render(<PetCard pet={samplePet} handleToggleFavorite={() => {}} />);
  
      // Check if the pet name and location are rendered
      expect(screen.getByText('Sample Pet')).toBeInTheDocument();
      expect(screen.getByText(/Sample City, CA/)).toBeInTheDocument();
  
      // Check if the More Info button is present
      expect(screen.getByText('More Info')).toBeInTheDocument();
  
      // Check if the description is present
      expect(screen.getByText(/This is a sample pet for testing/)).toBeInTheDocument();
  
      // Check if the favorite heart button is present
      expect(screen.getByTestId('favorite-heart')).toBeInTheDocument();
    });
  
    test('handles more info click', () => {
      // Mock the window.open function
      const originalOpen = window.open;
      window.open = jest.fn();
  
      render(<PetCard pet={samplePet} handleToggleFavorite={() => {}} />);
      fireEvent.click(screen.getByText('More Info'));
  
      // Check if the window.open function was called
      expect(window.open).toHaveBeenCalled();
  
      // Restore the original window.open function
      window.open = originalOpen;
    });
  
    test('handles toggle favorite click', () => {
      const handleToggleFavorite = jest.fn();
  
      render(<PetCard pet={samplePet} handleToggleFavorite={handleToggleFavorite} />);
      fireEvent.click(screen.getByTestId('favorite-heart'));
  
      // Check if the handleToggleFavorite function was called
      expect(handleToggleFavorite).toHaveBeenCalledWith(samplePet);
    });
  });