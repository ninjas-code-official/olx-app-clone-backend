/* eslint-disable react/display-name */
import React from 'react'
import { Container, Row, Card } from 'reactstrap'
import Header from '../components/Headers/Header.jsx'
import CustomLoader from '../components/Loader/CustomLoader'
import { getUsers } from '../apollo/server'
import DataTable from 'react-data-table-component'
import orderBy from 'lodash/orderBy'
import { gql, useQuery } from '@apollo/client'

const GET_USERS = gql`
  ${getUsers}
`
function Users() {
  const { data, loading, error } = useQuery(GET_USERS, {
    variables: {
      page: 0
    }
  })

  const columns = [
    {
      name: 'Name',
      sortable: true,
      selector: 'name',
      grow: 2
    },
    {
      name: 'Email',
      sortable: true,
      selector: 'email',
      cell: row => hiddenData(row.email, 'EMAIL'),
      grow: 3
    },
    {
      name: 'Phone',
      sortable: true,
      selector: 'phone',
      cell: row => hiddenData(row.phone, 'PHONE')
    },
    {
      name: 'Followers',
      sortable: false,
      cell: row => row.followers.length
    },
    {
      name: 'Following',
      sortable: false,
      cell: row => row.following.length
    },
    {
      name: 'Favourites',
      sortable: false,
      cell: row => row.likes.length
    },
  ]

  const hiddenData = (cell, column) => {
    if (column === 'EMAIL') {
      if (cell != null) {
        const splitArray = cell.split('@')
        splitArray.splice(0, 1, '*'.repeat(splitArray[0].length))
        const star = splitArray.join('@')
        return star
      } else {
        return '*'
      }
    } else if (column === 'PHONE') {
      const star = '*'.repeat(cell.length)
      return star
    }
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

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              {error ? (
                <span>
                  {'Error'}! ${error.message}
                </span>
              ) : (
                <DataTable
                  title={'Users'}
                  columns={columns}
                  data={data ? data.users : []}
                  pagination
                  progressPending={loading}
                  progressComponent={<CustomLoader />}
                  onSort={handleSort}
                  sortFunction={customSort}
                />
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Users
