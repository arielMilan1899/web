import React, {useState} from 'react'
import {
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CButton,
  CModal,
  CCol,
} from '@coreui/react'

const DeleteConfirmation = ({label, mutation, variables}) => {
  const [confirm, setConfirm] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const onConfirm = (value) => {
    setConfirm(value)
    setOpenModal(!openModal)
  }

  return (
    <>
      <CButton color="danger" className="px-4"
               onClick={() => setOpenModal(!openModal)}>
        Eliminar
      </CButton>
      <CModal
        show={openModal}
        onClosed={() => confirm && mutation({variables: variables})}
        onClose={() => setOpenModal(!openModal)}
      >
        <CModalHeader closeButton>
          <CModalTitle>
            Vas a eliminar <b>{label}</b>, esta acción no se puede deshacer.
          </CModalTitle>
        </CModalHeader>
        <CModalFooter>
          <CCol>
            <CButton color="danger" onClick={() => onConfirm(true)}>
              Eliminar
            </CButton>
            <CButton color="secondary" onClick={() => onConfirm(false)}>
              Cancelar
            </CButton>
          </CCol>
        </CModalFooter>
      </CModal>
    </>)
}

export default DeleteConfirmation
