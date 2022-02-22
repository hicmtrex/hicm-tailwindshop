import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import React, { useState, useContext, useEffect } from 'react';
import { LOCAL_STORAGE } from '../../store/cart-store/cart-context';
import CartStore from '../../store/cart-store/cart-store';
import countries from '../../utils/countries.json';

const ShippingAddress = () => {
  const { saveShippingAddress, shippingAddress } = useContext(CartStore);
  const { user } = useUser();
  const [fristName, setFirstName] = useState(user?.given_name || '');
  const [lastName, setLastName] = useState(user?.family_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (shippingAddress) {
      router.push('/cartshop/placeorder');
    }
  }, [shippingAddress]);

  const saveAddressHandler = (e) => {
    e.preventDefault();
    saveShippingAddress(
      {
        fristName,
        lastName,
        email,
        address,
        city,
        phone,
        country,
        state,
        postalCode,
      },
      () => {
        router.push('/cartshop/placeorder');
      }
    );
  };

  return (
    <>
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        {/* <Steps /> */}
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div>
            <div className='px-4 sm:px-0'>
              <h1 className='text-3xl font-medium leading-6 text-gray-900'>
                Personal Information
              </h1>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-3'>
            <form onSubmit={saveAddressHandler}>
              <div className='shadow overflow-hidden sm:rounded-md'>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='first-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        First name
                      </label>
                      <input
                        type='text'
                        name='first-name'
                        id='first-name'
                        className='form__input'
                        onClick={(e) => setFirstName(e.target.value)}
                        value={fristName}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='last-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Last name
                      </label>
                      <input
                        type='text'
                        name='last-name'
                        id='last-name'
                        className='form__input'
                        onClick={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-4'>
                      <label
                        htmlFor='email-address'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Email address
                      </label>
                      <input
                        onClick={(e) => setEmail(e.target.value)}
                        value={email}
                        type='text'
                        name='email-address'
                        id='email-address'
                        className='form__input'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='country'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Country
                      </label>
                      <select
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        id='country'
                        name='country'
                        className='form__input'
                      >
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='col-span-3'>
                      <label
                        htmlFor='street-address'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Phone
                      </label>
                      <input
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        type='text'
                        className='form__input'
                      />
                    </div>
                    <div className='col-span-6'>
                      <label
                        htmlFor='street-address'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Street address
                      </label>
                      <input
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        type='text'
                        className='form__input'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                      <label
                        htmlFor='city'
                        className='block text-sm font-medium text-gray-700'
                      >
                        City
                      </label>
                      <input
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        type='text'
                        name='city'
                        id='city'
                        className='form__input'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                      <label
                        htmlFor='region'
                        className='block text-sm font-medium text-gray-700'
                      >
                        State / Province
                      </label>
                      <input
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        type='text'
                        name='region'
                        id='region'
                        className='form__input'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                      <label
                        htmlFor='postal-code'
                        className='block text-sm font-medium text-gray-700'
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
                        type='text'
                        name='postal-code'
                        id='postal-code'
                        className='form__input'
                      />
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <button
                    type='submit'
                    onClick={saveShippingAddress}
                    className='inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Placeorder
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;
