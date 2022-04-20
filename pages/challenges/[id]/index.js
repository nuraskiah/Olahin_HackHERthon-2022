import withAuth from 'components/withAuth';
import ChallengeDetail from 'containers/challenge/detail';

export default withAuth(ChallengeDetail);

export const getServerSideProps = async ({ query }) => {
  try {
    const { id } = query;

    return { props: { id } };
  } catch (error) {
    console.log(error);
    return { props: { id: '' } };
  }
};
