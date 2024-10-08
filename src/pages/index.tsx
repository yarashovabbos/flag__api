"use strict";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Country {
  cca3: string;
  name: { common: string };
  flags: { png: string };
  population: number;
  region: string;
  capital: string;
}

const HomePage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterCountries(event.target.value, region);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(event.target.value);
    filterCountries(searchTerm, event.target.value);
  };

  const filterCountries = (searchTerm: string, region: string) => {
    const filtered = countries.filter(country => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = region ? country.region === region : true;
      return matchesSearch && matchesRegion;
    });
    setFilteredCountries(filtered);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <header className="mt-5 flex justify-between p-4 shadow-md">
        <h1 className="text-2xl font-bold">DUNYO Mamlakatlari</h1>
        {/* <button 
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
          onClick={() => setDarkMode(!darkMode)}
        >
       
        </button> */}
      </header>
      <main className="p-4">
        <div className="flex flex-col md:flex-row items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Davlatni nomini yozing ..."
            className="p-2 border border-gray-300 rounded-md mb-4 md:mb-0 md:mr-4"
          />
          <select 
            value={region} 
            onChange={handleRegionChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Qit'alar</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Amerika</option>
            <option value="Asia">Osiyo</option>
            <option value="Europe">Yevropa</option>
            <option value="Oceania">Janubiy Amerika</option>
          </select>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {filteredCountries.map(country => (
            <Link legacyBehavior key={country.cca3} href={`/country/${country.cca3}`}>
              <a className="d-block border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center">
                <img 
                  src={country.flags.png} 
                  alt={country.name.common} 
                  width={500} 
                  height={300} 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold">{country.name.common}</h2>
                  <p>Population: {country.population.toLocaleString()}</p>
                  <p>Region: {country.region}</p>
                  <p>Capital: {country.capital}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
