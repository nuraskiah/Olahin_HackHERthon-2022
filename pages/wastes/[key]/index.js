import withAuth from 'components/withAuth';
import WasteDetail from 'containers/waste/detail';

export default withAuth(WasteDetail);

export const getServerSideProps = async ({ query }) => {
  try {
    const { key } = query;

    return { props: { key, _key: key } };
  } catch (error) {
    console.log(error);
    return { props: { key: '', _key: '' } };
  }
};
