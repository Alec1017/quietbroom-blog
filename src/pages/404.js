import React from 'react';
import Layout from '../components/Layout';


function NotFoundPage(props) {
  return (
    <Layout location={props.location}>
      <h1>Looks like there's nothing here</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
}

export default NotFoundPage;
