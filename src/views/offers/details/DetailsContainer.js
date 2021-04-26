import React from 'react'
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useHistory} from 'react-router-dom'
import gql from 'graphql-tag';
import OfferDetails from "./Details";

export const OFFER_QUERY = gql`
  query Offer($id: Int!) {
    offer(id: $id) {
      id
      title{
        es
        en
      }
      price
      description{
        es
        en
      }
      slug{
        en
      }
      permalink{
       es
       en
      }
      onSale
      recommended
      subcategory{
        id
        title{
          es
          en
        }
        slug{
          en
        }
        parentCategory{
          id
          title{
            es
            en
          }
          slug{
            en
          }
        }
      }
      images{
        publicId
        url
      }
      materials{
        id
        title{
          es
          en
        }
      }
    }
  }
`;

/**
 * Mutation to delete offers
 */
export const DELETE_OFFERS_MUTATION = gql`
  mutation($ids: [ID]!) {
    deleteOffer(input: { ids: $ids }) {
      successIds
      errors {
        field
        messages
      }
    }
  }
`;

/**
 * Mutation to activate offers
 */
export const ACTIVATE_OFFERS_MUTATION = gql`
  mutation($ids: [ID]!) {
    activateOffer(input: { ids: $ids }) {
      successIds
      errors {
        field
        messages
      }
    }
  }
`;

/**
 * Mutation to deactivate offers
 */
export const DEACTIVATE_OFFERS_MUTATION = gql`
  mutation($ids: [ID]!) {
    deactivateOffer(input: { ids: $ids }) {
      successIds
      errors {
        field
        messages
      }
    }
  }
`;

export const ADD_RECOMMEND_OFFERS_MUTATION = gql`
  mutation($ids: [ID]!) {
    addRecommendOffer(input: { ids: $ids }) {
      successIds
      errors {
        field
        messages
      }
    }
  }
`;

export const DELETE_RECOMMEND_OFFERS_MUTATION = gql`
  mutation($ids: [ID]!) {
    deleteRecommendOffer(input: { ids: $ids }) {
      successIds
      errors {
        field
        messages
      }
    }
  }
`;

const OfferDetailsContainer = (props) => {
  const {offer: offerSlug} = props.match.params;
  const slugs = offerSlug.split('-')
  const offerId = slugs[slugs.length - 1]
  const history = useHistory()
  const {loading, error, data} = useQuery(OFFER_QUERY, {variables: {id: offerId}});
  const [deleteOffer] = useMutation(DELETE_OFFERS_MUTATION,
    {
      onCompleted({deleteOffer: {errors}}) {
        if (!errors) {
          history.goBack();
        }
      },
    });
  const [activateOffer] = useMutation(ACTIVATE_OFFERS_MUTATION,);
  const [deactivateOffer] = useMutation(DEACTIVATE_OFFERS_MUTATION,);

  if (error)
    return <p>Oops, algo salio mal!</p>

  if (loading)
    return <p>Cargando...</p>

  return (
    <OfferDetails
      data={{...data}}
      deleteOffer={deleteOffer}
      activateOffer={items => activateOffer({variables: {ids: items}})}
      deactivateOffer={items => deactivateOffer({variables: {ids: items}})}
    />
  );
}

export default OfferDetailsContainer;
