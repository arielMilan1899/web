import React, {Component, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CHeaderNavLink,
  CPagination,
  CRow
} from '@coreui/react'
import {apiUrl,} from "../../../config";
import {formatRoute} from "react-router-named-routes";

class GatewaysContainer extends Component {

  constructor(props) {
    super(props);
    const {gateway} = props.match.params;

    this.state = {serialNumber: gateway};
  }

  componentDidMount() {
    const {serialNumber} = this.state;
    fetch(`${apiUrl}/gateways/${serialNumber}`)
      .then(res => res.json())
      .then(({data}) => {
        this.setState({gateway: data})
      })
      .catch(console.log)
  }

  render() {
    return (
      <Gateway gateway={this.state.gateway}/>
    )
  }
}

const Gateway = ({gateway}) => {

  if (!gateway) {
    return null;
  }

  const {name, ipv4, peripherals} = gateway;

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1>{gateway.serialNumber}</h1>
          </CCardHeader>
          <CCardBody>
            <CCard>
              <CCardHeader>
                <b>
                  <p>Name: {name}</p>
                </b>
                <b>
                  <p>Ipv4: {ipv4}</p>
                </b>

              </CCardHeader>
              <CCardBody>
                <h5><b> Peripherals </b></h5>
                <CDataTable
                  items={peripherals}
                  fields={[
                    {key: 'ID', _classes: 'font-weight-bold'},
                    'Vendor', 'Status', "Acciones"
                  ]}
                  hover
                  striped
                  scopedSlots={{
                    'ID':
                      ({id}) => (
                        <td>
                          {id}
                        </td>
                      ),
                    'Vendor':
                      ({vendor}) => (
                        <td>
                          <p>{vendor}</p>
                        </td>
                      ),
                    'Status':
                      ({status}) => (
                        <td>
                          <p>{status}</p>
                        </td>
                      ),
                    'Acciones':
                      ({id, title, slug}) => (
                        <td>
                          {/*<CButton color='secondary' to={formatRoute(SUBCATEGORY_UPDATE, {*/}
                          {/*  category: category.slug.en,*/}
                          {/*  subcategory: slug.en.split('_')[1]*/}
                          {/*})}>Editar</CButton>*/}
                          {/*<DeleteConfirmation mutation={deleteCategory} variables={{ids: [id]}} label={title.es}/>*/}
                        </td>
                      )
                  }}
                />
              </CCardBody>
            </CCard>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default GatewaysContainer;
