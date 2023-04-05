/* eslint-disable camelcase */
import React, { useState } from 'react'
import { validateFunc } from '../../constraints/constraints'
import {TailSpin} from 'react-loader-spinner'

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

function SellingForm(props) {
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
  return (
    <Row>
      <Col className="order-xl-1">
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">
                  {props.subCategory
                    ? 'Edit Selling Form Details'
                    : 'Add Selling Form Details'}
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
                      {'Type Title'}
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
                        <option value={category._id} key={category._id}>
                          {'...loading'}
                        </option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {loader ? (
                    <Col className="text-right" xs="12">
                      <Button color="primary" onClick={() => null}>
                        <TailSpin                          
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
                            // mutate({
                            //   variables: {
                            //     _id: props.subCategory
                            //       ? props.subCategory._id
                            //       : '',
                            //     title: title,
                            //     category: category
                            //   }
                            // })
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

export default SellingForm
