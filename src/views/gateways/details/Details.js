import React, {Component} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import {useHistory} from 'react-router-dom'
import {apiUrl,} from "../../../config";
import {formatRoute} from "react-router-named-routes";
import {GATEWAYS_UPDATE} from "../../../routes";
import DeleteConfirmation from "../../helpers/deleteConfirmation";

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
  const history = useHistory();

  if (!gateway) {
    return null;
  }

  const removeGateway = (serialNumber) => {
    fetch(`${apiUrl}/gateways/remove`, {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({serialNumber}),
    })
      .then(response => response.json())
      .then(history.push(`/gateways`))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const {serialNumber, name, ipv4, peripherals} = gateway;

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <div className="card-header-actions">
              <CButton color='primary'
                       to={formatRoute(GATEWAYS_UPDATE, {gateway: serialNumber})}>Update</CButton>
              <DeleteConfirmation mutation={removeGateway} variables={serialNumber} label={'Gateway'}/>
            </div>
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
