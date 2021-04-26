import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {useHistory} from 'react-router-dom'
import {localStorageAuthKey, userLogged} from "../config";

/**
 * Mutation to logout
 */
export const LOGOUT_MUTATION = gql`
  mutation {
    logout(input: {}) {
      success
    }
  }
`;

const TheHeaderDropdown = () => {
  const history = useHistory()
  const [logout] = useMutation(
    LOGOUT_MUTATION,
    {
      onCompleted({logout: {errors}}) {
        if (!errors) {
          localStorage.removeItem(localStorageAuthKey);
          localStorage.removeItem(userLogged);
          history.push(`/login`);
        }
      },
    }
  );
  const user = JSON.parse(localStorage.getItem(userLogged));

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        {user.email}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem divider/>
        <CDropdownItem onClick={logout}>
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
