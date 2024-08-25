import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CountryDetailsPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [country, setCountry] = useState<any>(null);

  useEffect(() => {
    if (code) {
      const fetchCountry = async () => {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
          const data = await response.json();
          setCountry(data[0]);
        } catch (error) {
          console.error('Error fetching country:', error);
        }
      };
      fetchCountry();
    }
  }, [code]);

  if (!country) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
      <header className="flex justify-between p-4 shadow-md">
        <button onClick={() => router.back()} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">Back</button>
        <h1 className="text-2xl font-bold">Mamlakat ma'lumotlari</h1>
      </header>
      <main className="p-4">
        <div className="max-w-2xl mx-auto">
          <img src={country.flags.png} alt={country.name.common} className="w-full h-64 object-cover mb-4" />
          <h2 className="text-3xl font-bold mb-2">{country.name.common}</h2>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital}</p>
          <p>Subregion: {country.subregion}</p>
          <p>Languages: {Object.values(country.languages).join(', ')}</p>
        </div>
      </main>
    </div>
  );
};

export default CountryDetailsPage;
