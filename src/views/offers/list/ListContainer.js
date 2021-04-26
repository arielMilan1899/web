import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {
  CButton,
  CCard, CCardBody, CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import gql from 'graphql-tag'
import {initialValues} from "../filters/Filters";
import FiltersContainer from "../filters/FiltersContainer";
import {useQuery} from "@apollo/react-hooks";
import Offers from "./List";
import {OFFERS, OFFERS_CREATE} from "../../../routes";

/**
 * Query to fetch offers from api
 */
export const OFFERS_QUERY = gql`
  query AdminOffersList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $parentCategory: String
    $subcategory: String
    $titleDescription: String
    $id: String
    $sort: [SortChoices]
    $materials: [ID]
    $recommended: Boolean
  ) {
      offers(
      first: $first
      after: $after
      last: $last
      before: $before
      parentCategory: $parentCategory
      subcategory: $subcategory
      titleDescription: $titleDescription
      id: $id
      sort: $sort
      materials: $materials
      recommended: $recommended
    ) {
      pageInfo{
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
      edges {
        node {
          id
          price
          onSale
          recommended
          slug{
            en
          }
          title{
            es
            en          
          }
          shortDescription{
            es
            en
          }
          materials{
            id
            title{
              es
              en
            }
          }
          subcategory {
            id
            slug{
              en
            }
            title{
              es
              en
            }
            parentCategory {
              id
              slug{
                en
              }
              title{
                es
                en
              }
            }
          }
         }
       }
    }
  }
`;

const getUrlFilters = (fields) => {
  let filters = ''
  Object.keys(fields).forEach((key) => (filters += fields[key] !== null ? `&${key}=${fields[key]}` : ''))
  return filters
}

const ListContainer = () => {
  const history = useHistory()
  const params = new URLSearchParams(useLocation().search);
  const [page, setPage] = useState(1)
  const [fields, setFields] = useState(initialValues(params))
  const {loading, error, data} = useQuery(OFFERS_QUERY, {variables: {...fields},});

  const pageChange = newPage => {
    page !== newPage && setPage(newPage)
  }

  if (error)
    return <p>Oops, algo salio mal!</p>

  if (loading)
    return <p>Cargando...</p>

  return (
    <CRow>
      <CCol>
        <CCard>
          <FiltersContainer
            params={params}
            handleFiltersChange={(newFields) => {
              setFields({...fields, ...newFields});
              history.push(OFFERS + '?' + getUrlFilters({...fields, ...newFields}))
            }}/>
        </CCard>
        <CCard>
          <CCardHeader>
            <b>
              Ofertas
            </b>
            <div className="card-header-actions">
              <CButton color='success' to={OFFERS_CREATE}>Crear</CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <Offers offers={data.offers} page={page} pageChange={pageChange}/>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListContainer
