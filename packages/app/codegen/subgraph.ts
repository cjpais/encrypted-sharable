import { gql } from 'urql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Data = {
  readonly __typename?: 'Data';
  readonly created: Scalars['Int'];
  readonly creator?: Maybe<Person>;
  readonly data: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly keys: ReadonlyArray<Key>;
  readonly userData: Scalars['String'];
};

export type DataFilter = {
  readonly created?: InputMaybe<Scalars['Int']>;
  readonly created_gt?: InputMaybe<Scalars['Int']>;
  readonly created_gte?: InputMaybe<Scalars['Int']>;
  readonly created_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly created_lt?: InputMaybe<Scalars['Int']>;
  readonly created_lte?: InputMaybe<Scalars['Int']>;
  readonly created_not?: InputMaybe<Scalars['Int']>;
  readonly created_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['Int']>>>;
  readonly data?: InputMaybe<Scalars['String']>;
  readonly data_ends_with?: InputMaybe<Scalars['String']>;
  readonly data_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly data_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly data_not?: InputMaybe<Scalars['String']>;
  readonly data_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly data_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly data_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly data_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly data_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly data_starts_with?: InputMaybe<Scalars['String']>;
  readonly data_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly userData?: InputMaybe<Scalars['String']>;
  readonly userData_ends_with?: InputMaybe<Scalars['String']>;
  readonly userData_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly userData_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly userData_not?: InputMaybe<Scalars['String']>;
  readonly userData_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly userData_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly userData_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly userData_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly userData_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly userData_starts_with?: InputMaybe<Scalars['String']>;
  readonly userData_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export type Key = {
  readonly __typename?: 'Key';
  readonly address?: Maybe<Person>;
  readonly data?: Maybe<Data>;
  readonly encryptedKey: Scalars['String'];
  readonly ephemeralPublicKey: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly nonce: Scalars['String'];
};

export type KeyFilter = {
  readonly encryptedKey?: InputMaybe<Scalars['String']>;
  readonly encryptedKey_ends_with?: InputMaybe<Scalars['String']>;
  readonly encryptedKey_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly encryptedKey_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly encryptedKey_not?: InputMaybe<Scalars['String']>;
  readonly encryptedKey_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly encryptedKey_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly encryptedKey_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly encryptedKey_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly encryptedKey_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly encryptedKey_starts_with?: InputMaybe<Scalars['String']>;
  readonly encryptedKey_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly ephemeralPublicKey?: InputMaybe<Scalars['String']>;
  readonly ephemeralPublicKey_ends_with?: InputMaybe<Scalars['String']>;
  readonly ephemeralPublicKey_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly ephemeralPublicKey_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly ephemeralPublicKey_not?: InputMaybe<Scalars['String']>;
  readonly ephemeralPublicKey_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly ephemeralPublicKey_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly ephemeralPublicKey_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly ephemeralPublicKey_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly ephemeralPublicKey_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly ephemeralPublicKey_starts_with?: InputMaybe<Scalars['String']>;
  readonly ephemeralPublicKey_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly nonce?: InputMaybe<Scalars['String']>;
  readonly nonce_ends_with?: InputMaybe<Scalars['String']>;
  readonly nonce_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly nonce_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly nonce_not?: InputMaybe<Scalars['String']>;
  readonly nonce_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly nonce_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly nonce_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly nonce_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly nonce_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly nonce_starts_with?: InputMaybe<Scalars['String']>;
  readonly nonce_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export type Person = {
  readonly __typename?: 'Person';
  readonly address: Scalars['String'];
  readonly createdData: ReadonlyArray<Data>;
  readonly displayAddress: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly keys: ReadonlyArray<Key>;
  readonly publicKey: Scalars['String'];
};

export type PersonFilter = {
  readonly address?: InputMaybe<Scalars['String']>;
  readonly address_ends_with?: InputMaybe<Scalars['String']>;
  readonly address_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly address_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly address_not?: InputMaybe<Scalars['String']>;
  readonly address_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly address_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly address_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly address_starts_with?: InputMaybe<Scalars['String']>;
  readonly address_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly displayAddress?: InputMaybe<Scalars['String']>;
  readonly displayAddress_ends_with?: InputMaybe<Scalars['String']>;
  readonly displayAddress_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly displayAddress_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly displayAddress_not?: InputMaybe<Scalars['String']>;
  readonly displayAddress_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly displayAddress_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly displayAddress_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly displayAddress_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly displayAddress_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly displayAddress_starts_with?: InputMaybe<Scalars['String']>;
  readonly displayAddress_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['ID']>>>;
  readonly publicKey?: InputMaybe<Scalars['String']>;
  readonly publicKey_ends_with?: InputMaybe<Scalars['String']>;
  readonly publicKey_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly publicKey_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly publicKey_not?: InputMaybe<Scalars['String']>;
  readonly publicKey_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly publicKey_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly publicKey_not_in?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly publicKey_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly publicKey_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly publicKey_starts_with?: InputMaybe<Scalars['String']>;
  readonly publicKey_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly data?: Maybe<Data>;
  readonly datas: ReadonlyArray<Data>;
  readonly key?: Maybe<Key>;
  readonly keys: ReadonlyArray<Key>;
  readonly person?: Maybe<Person>;
  readonly persons: ReadonlyArray<Person>;
};


export type QueryDataArgs = {
  id: Scalars['ID'];
};


export type QueryDatasArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DataFilter>;
};


export type QueryKeyArgs = {
  id: Scalars['ID'];
};


export type QueryKeysArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<KeyFilter>;
};


export type QueryPersonArgs = {
  id: Scalars['ID'];
};


export type QueryPersonsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderDirection?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PersonFilter>;
};

export type PublicKeysQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicKeysQuery = { readonly __typename?: 'Query', readonly persons: ReadonlyArray<{ readonly __typename?: 'Person', readonly id: string, readonly address: string, readonly displayAddress: string, readonly publicKey: string }> };

export type MyMessagesQueryVariables = Exact<{
  addr: Scalars['String'];
}>;


export type MyMessagesQuery = { readonly __typename?: 'Query', readonly persons: ReadonlyArray<{ readonly __typename?: 'Person', readonly address: string, readonly keys: ReadonlyArray<{ readonly __typename?: 'Key', readonly id: string, readonly nonce: string, readonly ephemeralPublicKey: string, readonly encryptedKey: string, readonly data?: { readonly __typename?: 'Data', readonly id: string, readonly data: string, readonly created: number, readonly creator?: { readonly __typename?: 'Person', readonly address: string } | null } | null }> }> };


export const PublicKeysDocument = gql`
    query PublicKeys {
  persons {
    id
    address
    displayAddress
    publicKey
  }
}
    `;

export function usePublicKeysQuery(options?: Omit<Urql.UseQueryArgs<PublicKeysQueryVariables>, 'query'>) {
  return Urql.useQuery<PublicKeysQuery, PublicKeysQueryVariables>({ query: PublicKeysDocument, ...options });
};
export const MyMessagesDocument = gql`
    query MyMessages($addr: String!) {
  persons(where: {address: $addr}) {
    address
    keys {
      id
      nonce
      ephemeralPublicKey
      encryptedKey
      data {
        id
        data
        creator {
          address
        }
        created
      }
    }
  }
}
    `;

export function useMyMessagesQuery(options: Omit<Urql.UseQueryArgs<MyMessagesQueryVariables>, 'query'>) {
  return Urql.useQuery<MyMessagesQuery, MyMessagesQueryVariables>({ query: MyMessagesDocument, ...options });
};