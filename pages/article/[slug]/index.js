import withAuth from 'components/withAuth';
import Article from 'containers/article';

export default withAuth(Article);

export const getServerSideProps = async ({ query }) => {
  try {
    const { slug } = query;

    return { props: { slug } };
  } catch (error) {
    console.log(error);
    return { props: { slug: '' } };
  }
};
