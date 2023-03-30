/* eslint-disable react/display-name */
import React, { useState } from 'react'
import CategoryComponent from '../components/Category/Category'
import CustomLoader from '../components/Loader/CustomLoader'
// reactstrap components
import { Card, Container, Row, Modal } from 'reactstrap'
// core components
import Header from 'components/Headers/Header.jsx'
import { categories, deleteCategory } from '../apollo/server'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import { gql, useQuery } from '@apollo/client'
import ActionButton from '../components/ActionButton/ActionButton'

const GET_CATEGORIES = gql`
  ${categories}
`
const DELETE_CATEGORY = gql`
  ${deleteCategory}
`

const Category = props => {
  const [editModal, setEditModal] = useState(false)
  const [category, setCategory] = useState(null)
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    variables: { page: 0 }
  })
  const toggleModal = category => {
    setEditModal(!editModal)
    setCategory(category)
  }

  const customSort = (rows, field, direction) => {
    const handleField = row => {
      if (row[field]) {
        return row[field].toLowerCase()
      }

      return row[field]
    }

    return orderBy(rows, handleField, direction)
  }

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection)

  const columns = [
    {
      name: 'Title',
      sortable: true,
      selector: 'title'
    },
    {
      name: 'Image',
      sortable: false,
      cell: row => (
        <>
          {!!row.image && (
            <img className="img-responsive" src={row.image} alt="img menu" />
          )}
          {!row.image && 'No Image'}
        </>
      ),
    },
    {
      name: 'Action',
      cell: row => (
        <ActionButton
          deleteButton={true}
          editButton={true}
          row={row}
          mutation={DELETE_CATEGORY}
          editModal={toggleModal}
          refetchQuery={GET_CATEGORIES}
        />
      )
    }
  ]
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <CategoryComponent />
        {/* Table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              {error ? (
                <span>
                  {'Error'}! ${error.message}
                </span>
              ) : (
                <DataTable
                  title={'Categories'}
                  columns={columns}
                  data={data ? data.categories : []}
                  pagination
                  progressPending={loading}
                  progressComponent={<CustomLoader />}
                  onSort={handleSort}
                  sortFunction={customSort}
                  defaultSortField="title"
                />
              )}
            </Card>
          </div>
        </Row>
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={editModal}
          toggle={() => {
            toggleModal(null)
          }}>
          <CategoryComponent category={category} />
        </Modal>
      </Container>
    </>
  )
}
export default Category
