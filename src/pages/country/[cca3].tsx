"use strict";
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface Country {
  name: { common: string };
  flags: { png: string };
  population: number;
  region: string;
  capital: string;
}

const CountryPage = ({ country }: { country: Country }) => {
  const router = useRouter();
  const { cca3 } = router.query;

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <button 
        onClick={() => router.back()} 
        className="mb-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
      >
        Back
      </button>
      <div className={`border rounded-lg p-4 ${country ? 'bg-gray-200 dark:bg-gray-800' : ''}`}>
        <h1 className="text-2xl font-bold mb-2">{country.name.common}</h1>
        <img src={country.flags.png} alt={country.name.common} className="w-full h-48 object-cover mb-4" />
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital}</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cca3 } = context.query;

  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`);
    const data = await response.json();
    return {
      props: {
        country: data[0]
      }
    };
  } catch (error) {
    console.error('Error fetching country data:', error);
    return {
      props: {
        country: null
      }
    };
  }
};

export default CountryPage;
