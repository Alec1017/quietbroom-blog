import React from 'react';
import Layout from '../components/Layout';


function ContactPage(props) {
  return (
    <Layout location={props.location}>
      <h1>Contact Me</h1>
      <p>alecdifederico@gmail.com</p>
    </Layout>
  );
}

export default ContactPage;