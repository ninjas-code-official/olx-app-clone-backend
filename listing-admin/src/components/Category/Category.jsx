/* eslint-disable camelcase */
import React, { useState } from 'react'
import { validateFunc } from '../../constraints/constraints'
import { useMutation, gql } from '@apollo/client'
import { editCategory, createCategory, categories } from '../../apollo/server'
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
import { cloudinary_upload_url, cloudinary_categories } from '../../config/config'


const CREATE_CATEGORY = gql`
  ${createCategory}
`
const EDIT_CATEGORY = gql`
  ${editCategory}
`
const GET_CATEGORIES = gql`
  ${categories}
`

const loading = false
const errorMessage = false
const successMessage = false

function Category(props) {
  const [title, titleSetter] = useState(
    props.category ? props.category.title : ''
  )
  const [imgMenu, imgMenuSetter] = useState(
    props.category ? props.category.image : ''
  )
  const [errorMessage, errorMessageSetter] = useState('')
  const [successMessage, successMessageSetter] = useState('')

  const mutation = props.category ? EDIT_CATEGORY : CREATE_CATEGORY
  const [mutate, { loading }] = useMutation(mutation, {
    onCompleted,
    onError,
    refetchQueries: [{ query: GET_CATEGORIES }]
  })
  const [titleError, titleErrorSetter] = useState(null)

  const onBlur = (setter, field, state) => {
    setter(!validateFunc({ [field]: state }, field))
  }
  const onSubmitValidaiton = () => {
    const titleError = !validateFunc(
      { category_title: title },
      'category_title'
    )
    titleErrorSetter(titleError)
    return titleError
  }
  const selectImage = (event, state) => {
    const result = filterImage(event)
    if (result) {
      imageToBase64(result)
    }
  }
  const imageToBase64 = imgUrl => {
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      imgMenuSetter(fileReader.result)
    }
    fileReader.readAsDataURL(imgUrl)
  }

  const filterImage = event => {
    let images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i)
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    return images.length ? images[0] : undefined
  }

  const uploadImageToCloudinary = async () => {
    if (imgMenu === '') {
      return imgMenu
    }
    if (props.category && props.category.img_menu === imgMenu) {
      return imgMenu
    }

    const apiUrl = cloudinary_upload_url
    const data = {
      file: imgMenu,
      upload_preset: cloudinary_categories
    }
    try {
      const result = await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
      const imageData = await result.json()
      return imageData.secure_url
    } catch (e) {
      console.log(e)
    }
  }

  function onCompleted(data) {
    const message = props.category
      ? 'Category updated successfully'
      : 'Category added successfully'
    successMessageSetter(message)
    errorMessageSetter('')
    if (!props.category) clearFields()
    setTimeout(hideMessage, 3000)
  }
  const clearFields = () => {
    titleSetter('')
    imgMenuSetter('')
    titleErrorSetter(null)
  }
  function onError() {
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
                  {props.category ? 'Edit Category' : 'Add Category'}
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
                  <Col>
                    <h3 className="mb-0"> {'Category Image'}</h3>
                    <FormGroup>
                      <div className="card-title-image">
                        {imgMenu && typeof imgMenu === 'string' && (
                          <a
                            href="#pablo"
                            onClick={e => e.preventDefault()}>
                            <img
                              alt="..."
                              className="rounded-rectangle"
                              src={imgMenu}
                            />
                          </a>
                        )}
                        <input
                          className="mt-4"
                          type="file"
                          accept="image/*"
                          onChange={event => {
                            selectImage(event, 'imgMenu')
                          }}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-right" xs="12">
                    <Button
                      disabled={loading}
                      color="success"
                      href="#pablo"
                      onClick={async e => {
                        e.preventDefault()
                        if (onSubmitValidaiton()) {
                          mutate({
                            variables: {
                              _id: props.category ? props.category._id : '',
                              title: title,
                              image: await uploadImageToCloudinary()
                            }
                          })
                        }
                      }}
                      size="md">
                      {loading
                        ? <LoadingBtn height={15} width={35} />
                        : 'Save'}
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    {!!successMessage && (
                      <UncontrolledAlert color="success" fade={true}>
                        <span className="alert-inner--icon">
                          <i className="ni ni-like-2" />
                        </span>{' '}
                        <span className="alert-inner--text">
                          <strong>{'Success'}!</strong> {successMessage}
                        </span>
                      </UncontrolledAlert>
                    )}
                    {!!errorMessage && (
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

export default React.memo(Category)
