export const categories = `query categories
    {
      categories{
          _id
          title
          image
    }}`

export const createCategory = `
mutation CreateCategory($title:String!,$image:String!){
  createCategory(category:{title:$title,image:$image}){_id}
}`

export const editCategory = `
      mutation EditCategory( $_id:String,$title:String!,$image:String!){
        editCategory(category:{_id:$_id,title:$title,,image:$image}){_id}
      }`

export const deleteCategory = `
      mutation DeleteCategory($id:String!){
        deleteCategory(id:$id){
          _id
        }
      }`
export const subCategories = `query subCategories
      {
        subCategories{
            _id
            title
            category{
              _id
              title
            }
      }}`
export const createSubCategory = `
      mutation CreateSubCategory($title:String!,$category:String!){
        createSubCategory(subCategory:{title:$title,category:$category}){_id}
      }`

export const editSubCategory = `
            mutation EditSubCategory( $_id:String,$title:String!,$category:String!){
              editSubCategory(subCategory:{_id:$_id,title:$title,category:$category}){_id}
            }`

export const deleteSubCategory = `
            mutation DeleteSubCategory($id:String!){
              deleteSubCategory(id:$id){
                _id
              }
            }`

export const getDashboardTotal = `query GetDashboardTotal($starting_date: String, $ending_date: String){
  getDashboardTotal(starting_date: $starting_date, ending_date: $ending_date){
    total_orders
    total_users
    total_sales
  } 
}`

export const getDashboardSales = `query GetDashboardSales($startingDate: String, $endingDate: String){
  getDashboardSales(starting_date: $startingDate, ending_date: $endingDate){
    orders{
      day
      amount
    }
  }
}`

export const getDashboardUser = `query UserCount{
  userCount
}`
export const getDashboardOrders = `query GetDashboardOrders($startingDate: String, $endingDate: String){
  getDashboardOrders(starting_date: $startingDate, ending_date: $endingDate){
    orders{
      day
      count
    }
  }
}`

export const getConfiguration = `query GetConfiguration{
  configuration{
    _id
    itemPrefix
    email
    password
    enableEmail
    currency
    currencySymbol
  }
}`

export const saveOrderConfiguration = `mutation SaveOrderConfiguration($configurationInput:OrderConfigurationInput!){
  saveOrderConfiguration(configurationInput:$configurationInput){
    _id
    itemPrefix
  }
}`
export const saveEmailConfiguration = `mutation SaveEmailConfiguration($configurationInput:EmailConfigurationInput!){
  saveEmailConfiguration(configurationInput:$configurationInput){
    _id
    email
    password
    enableEmail
  }
}`

export const saveDeliveryConfiguration = `mutation SaveDeliveryConfiguration($configurationInput:DeliveryConfigurationInput!){
  saveDeliveryConfiguration(configurationInput:$configurationInput){
    _id
    deliveryCharges
  }
}`
export const saveCurrencyConfiguration = `mutation SaveCurrencyConfiguration($configurationInput:CurrencyConfigurationInput!){
  saveCurrencyConfiguration(configurationInput:$configurationInput){
    _id
    currency
    currencySymbol
  }
}`

export const adminLogin = `mutation AdminLogin($email:String!,$password:String!){
  adminLogin(email:$email,password:$password){
    userId
    token
    name
    email
  }
}`

export const uploadToken = `mutation UploadToken($pushToken:String!){
  uploadToken(pushToken:$pushToken){
    _id
    pushToken
  }
}`

export const getUsers = `query Users($page:Int){
  users(page:$page){
    _id
    name
    email
    phone
    followers{
      _id
    }
    following{
      _id
    }
    likes{
      _id
    }
  }
}`

export const allItems = `query AllItems{
  allItems{
    _id
    itemId
    title
    description
    condition
    subCategory{
      _id
      title
    }
    zone{
      _id
      title
      description
      location{
        coordinates
      }
    }
    status
    images
    price
    user{
      _id
      name
      phone
      email
      showPhone
    }
    address{
      _id
      address
      location{
        coordinates
      }
    }
  }
}`

export const subscribeCreateAd = `subscription SubscribeCreateAd {
  subscribeCreateAd{
    item {
        _id
      itemId
      title
      description
      condition
      subCategory{
        _id
        title
      }
      zone{
        _id
        title
        description
        location{
          coordinates
        }
      }
      status
      images
      price
      user{
        _id
        name
        phone
        email
        showPhone
      }
      address{
        _id
        address
        location{
          coordinates
        }
      }
    }
    origin
  }
}`

export const resetPassword = `mutation ResetPassword($password:String!,$token:String!){
  resetPassword(password:$password,token:$token){
    result
  }
}`

export const createZone = `mutation CreateZone($zone:ZoneInput!){
  createZone(zone:$zone){
    _id
    title
    description
    location{coordinates}
    isActive
  }
}`

export const editZone = `mutation EditZone($zone:ZoneInput!){
  editZone(zone:$zone){
    _id
    title
    description
    location{coordinates}
    isActive
  }
}`

export const getZones = `query Zones{
    zones{
    _id
    title
    description
    location{coordinates}
    isActive
    }
}`

export const deleteZone = `mutation DeleteZone($id:String!){
  deleteZone(id:$id){
    _id
    title
    description
    location{coordinates}
    isActive
  }
}`

export const updateItemStatus = `mutation UpdateItemStatus($id:String!,$status:String!){
  updateItemStatus(id:$id,status:$status){
    _id
    status
  }
}`

export const sendNotificationUser = `mutation SendNotificationUser($notificationTitle:String, $notificationBody: String!){
  sendNotificationUser(notificationTitle:$notificationTitle,notificationBody:$notificationBody)
}
`