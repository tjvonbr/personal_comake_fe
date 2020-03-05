import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import { Button, Card, Icon, Image, Table } from 'semantic-ui-react';
import EditIssue from './EditIssue';
import styled from 'styled-components';
import ProfileTable from './ProfileTable';
import ProfileCard from './ProfileCard';
import styles from '../styles/listStyles.css';


const Container = styled.div`
display: flex;
justify-content: center;

`
const Body = styled.div`
flex-direction: column;

`

const PCard = styled.div`
width: 500px;
`
const Nav = styled.nav`
display: flex;
border: none;
justify-content: space-evenly;
align-items: center;
font-family: 'helvetica', sans serif;
a {color:#eb472c;
  text-decoration: none}
height: 50px;
font-size: 1.2rem;
font-weight: bold;
`

function Profile(props) {
    const [currentUser, setCurrentUser] = useState("")
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [isEditingIssue, setIsEditingIssue] = useState(false);
    const [issueToUpdate, setIssueToUpdate] = useState({})
    let token = JSON.parse(localStorage.getItem('token'))
    let localId = JSON.parse(localStorage.getItem('id'))

    useEffect(()=>{
        axios
           .get(`https://co-make.herokuapp.com/users/${localId}/issues`, {
              headers: {
                Authorization: token
              }
             })
            .then( res => {
            console.log("USER DATA FROM SERVER", res)
            setCurrentUser(res.data)
          })
            .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
        },[])

        const handleEdit = e => {
          setIsEditingUser(!isEditingUser);
        };
        const handleEditIssue = id => {
          let thisIssue = currentUser.issues.filter( issue => issue.id === id);
          setIssueToUpdate(...thisIssue)
          setIsEditingIssue(!isEditingIssue)
        }

        const deleteIssue = id => {
          axios
            .delete(`https://co-make.herokuapp.com/issues/${id}`, {
              headers: {
                Authorization: token
              }
            })
            .then( res => {

              axios.get(`https://co-make.herokuapp.com/users/${localId}/issues`, {
                headers: {
                  Authorization: token
                }
               }).then( res => {
                 console.log("NEW DATA FROM SERVER", res)
                 setCurrentUser(res.data)
               }).catch( err => {
                 console.log("OH NO", err)
               })
            })
            .catch( err => {
              console.log("Error on delete", err)
            })

        }

    return (
      <>

        <Container>

      { isEditingUser ? (
        <EditProfile

            handleEdit={handleEdit}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
             />
        )
        : isEditingIssue ? (
          <EditIssue
          setCurrentUser={setCurrentUser}
          setIsEditingIssue={setIsEditingIssue}
          isEditingIssue={isEditingIssue}
          issueToUpdate={issueToUpdate}

          />
        )
        : (
          <Body>

        <ProfileCard currentUser={currentUser} dog={handleEdit} image={currentUser.picture} />

        <ProfileTable currentUser={currentUser} handleEditIssue={handleEditIssue} deleteIssue={deleteIssue} />

        <footer className="footer-nav">
          <Nav className="bottom-nav">

            <Button.Group widths="3" size="big">
              <Button icon="list alternate outline"
                      content='Feed'
                      onClick={() => props.history.push("/")}
              />
              <Button icon="add"
                      content='Create Issue'
                      onClick={() => props.history.push("/addIssue")}
              />
              <Button icon="user"
                      content='Profile'
                      onClick={() => props.history.push(`/profile/${localId}`)}
              />
            </Button.Group>
          </Nav>
        </footer>
          </Body>




        )
        }
       </Container>
      </>
    )
  }

  export default Profile;

