import React from 'react'
import { Badge } from 'reactstrap'
import { categories, deleteCategory } from '../../apollo/server'
import {ThreeDots} from 'react-loader-spinner'
import { useMutation, gql } from '@apollo/client'

const GET_CATEGORIES = gql`
  ${categories}
`
const DELETE_CATEGORY = gql`
  ${deleteCategory}
`

function ActionButton(props) {
  const mutation = props.mutation ? props.mutation : DELETE_CATEGORY
  const query = props.refetchQuery ? props.refetchQuery : GET_CATEGORIES
  var [mutate, { loading: deleteLoading }] = useMutation(mutation, {
    refetchQueries: [{ query: query }]
  })
  return (
    <>
      {props.editButton && (
        <>
          <Badge
            href="#pablo"
            onClick={e => {
              e.preventDefault()
              props.editModal(props.row)
            }}
            color="primary"
            >
           <h6 style={{fontSize: 9, color: 'white'}}>Edit</h6>
          </Badge>
          &nbsp;&nbsp;
        </>
      )}
      {props.deleteButton && deleteLoading ? (
        <ThreeDots
          color="#BB2124"
          height={20}
          width={40}
          visible={deleteLoading}
        />
      ) : (
        <Badge
          href="#pablo"
          color="danger"
          onClick={e => {
            e.preventDefault()
            mutate({
              variables: {
                id: props.row._id
              }
            })
          }}>
          <h6 style={{fontSize: 9, color: 'white'}}>Delete</h6>
        </Badge>
      )}
    </>
  )
}
export default React.memo(ActionButton)
