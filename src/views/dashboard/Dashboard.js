import React from 'react'
import {
  CButton,
  CCol,
  CRow,
} from '@coreui/react'
import {useHistory} from 'react-router-dom'
import {CATEGORIES} from "../../routes";


const Dashboard = () => {
  const history = useHistory();
  return (
    <>
      <CRow className="align-items-center mt-3">
        <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <CButton color="primary" size="lg" onClick={() => history.push(CATEGORIES)}>Categorías</CButton>
        </CCol>
        <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <CButton color="primary" size="lg" onClick={() => history.push(`/materials`)}>Materiales</CButton>
        </CCol>
        <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
          <CButton color="primary" size="lg" onClick={() => history.push(`/offers`)}>Ofertas</CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
