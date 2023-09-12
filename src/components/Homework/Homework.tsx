import { useCountries } from '../../hooks/useCountries';
import { Country } from '../Assignment/Assignment.types';
import { Datatable } from '../Datatable/Datatable';
import { ColumnProps } from '../Datatable/Datatable.types';

export const Homework = () => {
  const { loading, error, data } = useCountries();

  const countryData: Country[] = data?.countries;

  let dictionary: ColumnProps<Country>[] = [
    {
      key: 'name',
      label: 'Country Name',
    },
    {
      key: 'capital',
      label: 'Capital',
    },
    {
      key: 'code',
      label: 'Code',
    },
    {
      key: 'currency',
      label: 'Currency',
    },
    {
      key: 'native',
      label: 'Native',
    },
    {
      key: 'phone',
      label: 'Phone',
    },
  ];

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <Datatable columns={dictionary} data={countryData} />
    </div>
  );
};
