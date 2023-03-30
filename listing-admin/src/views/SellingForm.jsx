/* eslint-disable react/display-name */
import React, { useState } from 'react'
import SellingFormComponent from '../components/SellingForm/SellingForm'
// reactstrap components
import { Card, Container, Row, Modal } from 'reactstrap'
import { useQuery, gql } from '@apollo/client'
import { subCategories, deleteSubCategory } from '../apollo/server'
// core components
import Header from 'components/Headers/Header.jsx'
import CustomLoader from '../components/Loader/CustomLoader'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import ActionButton from '../components/ActionButton/ActionButton'

const GET_SUB_CATEGORIES = gql`
  ${subCategories}
`
const DELETE_SUB_CATEGORY = gql`
  ${deleteSubCategory}
`

function SellingForm(props) {
  const [editModal, setEditModal] = useState(false)
  const [subCategory, setSubCategory] = useState(null)
  const { data, loading, error } = useQuery(GET_SUB_CATEGORIES, {
    variables: { page: 0 }
  })

  const toggleModal = subCategory => {
    setEditModal(!editModal)
    setSubCategory(subCategory)
  }

  const customSort = (rows, field, direction) => {
    const handleField = row => {
      if (field === 'category.title') {
        if (row.category.title) {
          return row.category.title.toLowerCase()
        }
        return row.category.title
      } else {
        if (row[field]) {
          return row[field].toLowerCase()
        }

        return row[field]
      }
    }

    return orderBy(rows, handleField, direction)
  }

  const columns = [
    {
      name: 'Title',
      sortable: true,
      selector: 'title'
    },
    {
      name: 'Category',
      sortable: true,
      selector: 'category.title'
    },
    {
      name: 'Action',
      cell: row => (
        <ActionButton
          deleteButton={true}
          editButton={true}
          row={row}
          mutation={DELETE_SUB_CATEGORY}
          editModal={toggleModal}
          refetchQuery={GET_SUB_CATEGORIES}
        />
      )
    }
  ]

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection)

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <SellingFormComponent />
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
                  title={'Selling Form Details'}
                  columns={columns}
                  data={data ? data.subCategories : []}
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
          <SellingFormComponent subCategory={subCategory} />
        </Modal>
      </Container>
    </>
  )
}
export default SellingForm
