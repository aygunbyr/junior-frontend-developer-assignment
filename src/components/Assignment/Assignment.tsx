import { useCountries } from '../../hooks/useCountries';
import { Country } from './Assignment.types';
import { Datatable } from '../Datatable/Datatable';
import { ColumnProps } from '../Datatable/Datatable.types';

export const Assignment = () => {
  const { loading, error, data } = useCountries();

  const dictionary: ColumnProps<Country>[] = [
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
    <>
      <Datatable columns={dictionary} data={data.countries} />
    </>
  );
};
