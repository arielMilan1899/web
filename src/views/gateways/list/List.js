import React, {Component} from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CHeaderNavLink, CButton
} from '@coreui/react'
import {apiUrl} from "../../../config";
import {formatRoute} from "react-router-named-routes";
import {GATEWAYS_DETAIL} from "../../../routes";

class GatewaysListContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gateways: [],
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}/gateways`)
      .then(res => res.json())
      .then(({data}) => {
        this.setState({gateways: data})
      })
      .catch(console.log)
  }

  render() {
    return (
      <Gateways gateways={this.state.gateways}/>
    )
  }
}

const Gateways = ({gateways}) => {
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <b>
              Gateways
            </b>
            <div className="card-header-actions">
              <CButton color='success'>Crear</CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={gateways}
              fields={[
                {key: 'Serial number', _classes: 'font-weight-bold'},
                'Name', "Ipv4", "Peripherals", "Acciones"
              ]}
              hover
              striped
              scopedSlots={{
                'Serial number':
                  ({serialNumber}) => (
                    <td>
                      <CHeaderNavLink color='primary' to={formatRoute(GATEWAYS_DETAIL, {gateway: serialNumber})}>
                        <div>
                          {`${serialNumber}`}
                        </div>
                      </CHeaderNavLink>
                    </td>
                  ),
                'Name':
                  ({name}) => (
                    <td>
                      <p>{name}</p>
                    </td>
                  ),
                'Ipv4':
                  ({ipv4}) => (
                    <td>
                      <p>{ipv4}</p>
                    </td>
                  ),
                'Peripherals':
                  ({peripherals}) => (
                    <td>
                      <p>{peripherals.length}</p>
                    </td>
                  ),
                'Acciones':
                  ({id, title, slug}) => (
                    <td>
                      {/*<CButton color='secondary'*/}
                      {/*         to={formatRoute(CATEGORY_UPDATE, {category: slug.en})}>Editar</CButton>*/}
                      {/*<DeleteConfirmation mutation={deleteCategory} variables={{ids: [id]}} label={title.es}/>*/}
                    </td>
                  )
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
};

export default GatewaysListContainer
