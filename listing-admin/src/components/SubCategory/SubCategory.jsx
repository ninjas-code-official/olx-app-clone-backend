/* eslint-disable camelcase */
import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { validateFunc } from '../../constraints/constraints'
import Loader from 'react-loader-spinner'
import {
  editSubCategory,
  createSubCategory,
  subCategories,
  categories
} from '../../apollo/server'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  UncontrolledAlert
} from 'reactstrap'
import LoadingBtn from '../Loader/LoadingBtn'
const CREATE_SUB_CATEGORY = gql`
  ${createSubCategory}
`
const EDIT_SUB_CATEGORY = gql`
  ${editSubCategory}
`
const GET_CATEGORIES = gql`
  ${categories}
`
const GET_SUB_CATEGORIES = gql`
  ${subCategories}
`

function SubCategory(props) {
  const [title, titleSetter] = useState(
    props.subCategory ? props.subCategory.title : ''
  )
  const [category, categorySetter] = useState(
    props.subCategory ? props.subCategory.category._id : ''
  )
  const [errorMessage, errorMessageSetter] = useState('')
  const [successMessage, successMessageSetter] = useState('')
  const [categoryError, categoryErrorSetter] = useState(null)
  const [titleError, titleErrorSetter] = useState(null)
  const [loader, loaderSetter] = useState(false)

  const mutation = props.subCategory ? EDIT_SUB_CATEGORY : CREATE_SUB_CATEGORY
  const [mutate] = useMutation(mutation, {
    onCompleted,
    onError,
    refetchQueries: [{ query: GET_SUB_CATEGORIES }]
  })

  const { data, loading: loadingCategory, error } = useQuery(GET_CATEGORIES)

  const onBlur = (setter, field, state) => {
    setter(!validateFunc({ [field]: state }, field))
  }

  const handleChange = event => {
    categorySetter(event.target.value)
  }

  const onSubmitValidaiton = () => {
    const titleError = !validateFunc(
      { category_title: title },
      'category_title'
    )
    const categoryError = !validateFunc({ category: category }, 'category')
    categoryErrorSetter(categoryError)
    titleErrorSetter(titleError)
    return titleError
  }

  const clearFields = () => {
    titleSetter('')
    titleErrorSetter(null)
    categoryErrorSetter(null)
  }

  function onCompleted(data) {
    const message = props.subCategory
      ? 'Category updated successfully'
      : 'Category added successfully'
    successMessageSetter(message)
    errorMessageSetter('')
    loaderSetter(false)
    if (!props.subCategory) clearFields()
    setTimeout(hideMessage, 3000)
  }
  function onError() {
    loaderSetter(false)
    const message = 'Action failed. Please Try again'
    successMessageSetter('')
    errorMessageSetter(message)
    setTimeout(hideMessage, 3000)
  }

  const hideMessage = () => {
    successMessageSetter('')
    errorMessageSetter('')
  }
  return (
    <Row>
      <Col className="order-xl-1">
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">
                  {props.subCategory
                    ? 'Edit Sub Category'
                    : 'Add Sub Category'}
                </h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <label className="form-control-label" htmlFor="input-title">
                      {'Title'}
                    </label>
                    <br />
                    <FormGroup
                      className={
                        titleError === null
                          ? ''
                          : titleError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        className="form-control-alternative"
                        id="input-title"
                        placeholder="e.g "
                        type="text"
                        value={title}
                        onChange={event => {
                          titleSetter(event.target.value)
                        }}
                        onBlur={event => {
                          onBlur(titleErrorSetter, 'category_title', title)
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <label
                      className="form-control-label"
                      htmlFor="input-category">
                      {'Category'}
                    </label>
                    {error ? (
                      ' Error'
                    ) : loadingCategory ? (
                      ' Loading'
                    ) : (
                    <FormGroup
                      className={
                        categoryError === null
                          ? ''
                          : categoryError
                            ? 'has-success'
                            : 'has-danger'
                      }>
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        value={category}
                        onChange={handleChange}
                        onBlur={event => {
                          onBlur(categoryErrorSetter, 'category', category)
                        }}>
                        {!category && (
                          <option value={''}>{'Select'}</option>
                        )}
                        {data.categories.map(category => (
                            <option value={category._id} key={category._id}>
                              {category.title}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                    )}
                  </Col>
                </Row>
                <Row>
                  {loader ? (
                    <Col className="text-right" xs="12">
                      <Button color="primary" onClick={() => null}>
                        <Loader
                          type="TailSpin"
                          color="#FFF"
                          height={25}
                          width={30}
                          visible={loader}
                        />
                      </Button>
                    </Col>
                  ) : (
                    <Col className="text-right" xs="12">
                      <Button
                        disabled={loader}
                        color="success"
                        href="#pablo"
                        onClick={async e => {
                          e.preventDefault()
                          successMessageSetter('')
                          errorMessageSetter('')
                          if (onSubmitValidaiton()) {
                            loaderSetter(true)
                            mutate({
                              variables: {
                                _id: props.subCategory
                                  ? props.subCategory._id
                                  : '',
                                title: title,
                                category: category
                              }
                            })
                          }
                        }}
                        size="md">
                        {loader
                          ? <LoadingBtn height={15} width={35} />
                          : 'Save'}
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col lg="6">
                    {successMessage && (
                      <UncontrolledAlert color="success" fade={true}>
                        <span className="alert-inner--icon">
                          <i className="ni ni-like-2" />
                        </span>{' '}
                        <span className="alert-inner--text">
                          <strong>{'Success'}!</strong> {successMessage}
                        </span>
                      </UncontrolledAlert>
                    )}
                    {errorMessage && (
                      <UncontrolledAlert color="danger" fade={true}>
                        <span className="alert-inner--icon">
                          <i className="ni ni-like-2" />
                        </span>{' '}
                        <span className="alert-inner--text">
                          <strong>{'Danger'}!</strong> {errorMessage}
                        </span>
                      </UncontrolledAlert>
                    )}
                  </Col>
                </Row>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default SubCategory
