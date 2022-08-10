import styles from './SearchIndustries.module.scss';

import { useFetchIndustries } from '../../../hooks/useFetchIndustries';
import { useQuery } from '../../../hooks/useQuery';
import IndustryTable from '../../../components/IndustryTable';

const SearchIndustries = () => {
  const query = useQuery();
  const search = query.get('q'); // traz o parametro passado atravez da url (no caso 'q', de query)

  const { industries } = useFetchIndustries('industries', search);

  console.log(industries);

  return (
    <section className={styles.search}>
      {industries && industries.length === 0 && (
        <p>Nenhuma indústria foi encontrada.</p>
      )}
      {industries && industries.length > 0 && (
        <IndustryTable industries={industries} />
      )}
    </section>
  );
};

export default SearchIndustries;
