import React, { useContext, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/solid';
import CartStore from '../../store/cart-store/cart-store';
import { getProductById, getProducts } from '../../utils/help-api';

const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ProductDetail = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('L');
  const { setOpen, addToCart } = useContext(CartStore);

  return (
    <div className='max-w-2xl mx-auto py-3 px-4 sm:py-5 sm:px-6 lg:max-w-7xl lg:px-8'></div>
  );
};

export default ProductDetail;
