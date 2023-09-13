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
      label: 'name',
    },
    {
      key: 'capital',
      label: 'capital',
    },
    {
      key: 'code',
      label: 'code',
    },
    {
      key: 'currency',
      label: 'currency',
    },
    {
      key: 'native',
      label: 'native',
    },
    {
      key: 'phone',
      label: 'phone',
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
