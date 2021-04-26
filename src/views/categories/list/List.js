import React, {useState} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination, CHeaderNavLink, CButton
} from '@coreui/react'
import gql from 'graphql-tag'
import {useMutation, useQuery} from "@apollo/react-hooks";
import DeleteConfirmation from "../../helpers/deleteConfirmation";
import {DELETE_CATEGORY_MUTATION} from "../details/DetailsContainer";
import {itemsPerPage} from "../../../config";
import {CATEGORY_CREATE, CATEGORY_DETAIL, CATEGORY_UPDATE} from "../../../routes";
import {formatRoute} from 'react-router-named-routes';

export const CATEGORIES_QUERY = gql`
    {
        categories {
            id
            posterPublicId
            posterUrl
            title {
                es
                en
            }
            slug {
                en
            }
            description {
                es
                en
            }
            subcategories {
                id
                posterPublicId
                posterUrl
                title {
                    es
                    en
                }
                description {
                    es
                    en
                }
                slug {
                  en
                }
            }
        }
    }
`

const Categories = () => {
  const [page, setPage] = useState(1)
  const {loading, error, data} = useQuery(CATEGORIES_QUERY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION);

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
          <CCardHeader>
            <b>
              Categorías
            </b>
            <div className="card-header-actions">
              <CButton color='success' to={CATEGORY_CREATE}>Crear</CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={data.categories}
              fields={[
                {key: 'Título', _classes: 'font-weight-bold'},
                'Descripción', "Subcategorías", "Acciones"
              ]}
              hover
              striped
              itemsPerPage={itemsPerPage}
              activePage={page}
              scopedSlots={{
                'Título':
                  ({title, slug}) => (
                    <td>
                      <CHeaderNavLink color='primary' to={formatRoute(CATEGORY_DETAIL, {category: slug.en})}>
                        <div>
                          {`${title.es}`}
                        </div>
                        <div>
                          {`${title.en}`}
                        </div>
                      </CHeaderNavLink>
                    </td>
                  ),
                'Descripción':
                  ({description}) => (
                    <td>
                      <p>{`${description.es || ''}`}</p>
                      <p>{`${description.en || ''}`}</p>
                    </td>
                  ),
                'Subcategorías':
                  ({subcategories}) => (
                    <td>
                      <p>{subcategories.length}</p>
                    </td>
                  ),
                'Acciones':
                  ({id, title, slug}) => (
                    <td>
                      <CButton color='secondary' to={formatRoute(CATEGORY_UPDATE, {category: slug.en})}>Editar</CButton>
                      <DeleteConfirmation mutation={deleteCategory} variables={{ids: [id]}} label={title.es}/>
                    </td>
                  )
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={Math.ceil(data.categories.length / itemsPerPage)}
              doubleArrows={false}
              arrows={Math.ceil(data.categories.length / itemsPerPage) > 1}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Categories
