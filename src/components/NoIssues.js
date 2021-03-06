/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import img from '../assets/bermuda/bermuda-no-comments.png';
import NavBar from './NavBar';

function NoIssues(props) {
  const history = useHistory();

  return (
    <div>
      <NavBar />
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Image src={img} alt="No Issues" centered size='medium'/>
          <Header as='h2' color='teal' textAlign='center'>
            No issues have been posted for your community!  Be the first!
          </Header>
          <Button
            color='facebook'
            size='huge'
            onClick={() => history.push('/addissue')}
          >
            Add Issue
          </Button>
        </Grid.Column>
      </Grid>
    </div>
  )
};

export default NoIssues;
