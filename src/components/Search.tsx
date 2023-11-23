"use client";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Sample data for cafes and products
const allCafesAndProducts = [
  { id: 1, name: 'Cafe A', type: 'cafe' },
  { id: 2, name: 'Cafe B', type: 'cafe' },
  { id: 3, name: 'Restaurant X', type: 'restaurant' },
  { id: 4, name: 'Product 1', type: 'product' },
  { id: 5, name: 'Product 2', type: 'product' },
];

const CafeProductList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<{ id: number; name: string; type: string; }[]>([]);

  // Function to handle search input change
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  
  // Function to filter cafes/products based on the search query
  const filterCafesAndProducts = () => {
    const filtered = allCafesAndProducts.filter(
      item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      <TextField
        label="Search Cafes/Products"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <Button variant="contained" onClick={filterCafesAndProducts}>
        Search
      </Button>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CafeProductList;
