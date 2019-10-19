/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type CreateInvestmentInput = {
  id?: string | null;
  type: string;
  date: string;
  value: number;
};

export type UpdateInvestmentInput = {
  id: string;
  type?: string | null;
  date?: string | null;
  value?: number | null;
};

export type DeleteInvestmentInput = {
  id?: string | null;
};

export type ModelinvestmentFilterInput = {
  id?: ModelIDFilterInput | null;
  type?: ModelStringFilterInput | null;
  date?: ModelStringFilterInput | null;
  value?: ModelFloatFilterInput | null;
  and?: Array<ModelinvestmentFilterInput | null> | null;
  or?: Array<ModelinvestmentFilterInput | null> | null;
  not?: ModelinvestmentFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelFloatFilterInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  contains?: number | null;
  notContains?: number | null;
  between?: Array<number | null> | null;
};

export type CreateInvestmentMutation = {
  __typename: "investment";
  id: string;
  type: string;
  date: string;
  value: number;
};

export type UpdateInvestmentMutation = {
  __typename: "investment";
  id: string;
  type: string;
  date: string;
  value: number;
};

export type DeleteInvestmentMutation = {
  __typename: "investment";
  id: string;
  type: string;
  date: string;
  value: number;
};

export type GetInvestmentQuery = {
  __typename: "investment";
  id: string;
  type: string;
  date: string;
  value: number;
};

export type ListInvestmentsQuery = {
  __typename: "ModelinvestmentConnection";
  items: Array<{
    __typename: "investment";
    id: string;
    type: string;
    date: string;
    value: number;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateInvestmentSubscription = {
  __typename: "investment";
  id: string;
  type: string;
  date: string;
  value: number;
};

export type OnUpdateInvestmentSubscription = {
  __typename: "investment";
  id: string;
  type: string;
  date: string;
  value: number;
};

export type OnDeleteInvestmentSubscription = {
  __typename: "investment";
  id: string;
  type: string;
  date: string;
  value: number;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateInvestment(
    input: CreateInvestmentInput
  ): Promise<CreateInvestmentMutation> {
    const statement = `mutation CreateInvestment($input: CreateInvestmentInput!) {
        createInvestment(input: $input) {
          __typename
          id
          type
          date
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateInvestmentMutation>response.data.createInvestment;
  }
  async UpdateInvestment(
    input: UpdateInvestmentInput
  ): Promise<UpdateInvestmentMutation> {
    const statement = `mutation UpdateInvestment($input: UpdateInvestmentInput!) {
        updateInvestment(input: $input) {
          __typename
          id
          type
          date
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateInvestmentMutation>response.data.updateInvestment;
  }
  async DeleteInvestment(
    input: DeleteInvestmentInput
  ): Promise<DeleteInvestmentMutation> {
    const statement = `mutation DeleteInvestment($input: DeleteInvestmentInput!) {
        deleteInvestment(input: $input) {
          __typename
          id
          type
          date
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteInvestmentMutation>response.data.deleteInvestment;
  }
  async GetInvestment(id: string): Promise<GetInvestmentQuery> {
    const statement = `query GetInvestment($id: ID!) {
        getInvestment(id: $id) {
          __typename
          id
          type
          date
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetInvestmentQuery>response.data.getInvestment;
  }
  async ListInvestments(
    filter?: ModelinvestmentFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListInvestmentsQuery> {
    const statement = `query ListInvestments($filter: ModelinvestmentFilterInput, $limit: Int, $nextToken: String) {
        listInvestments(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            type
            date
            value
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListInvestmentsQuery>response.data.listInvestments;
  }
  OnCreateInvestmentListener: Observable<
    OnCreateInvestmentSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateInvestment {
        onCreateInvestment {
          __typename
          id
          type
          date
          value
        }
      }`
    )
  ) as Observable<OnCreateInvestmentSubscription>;

  OnUpdateInvestmentListener: Observable<
    OnUpdateInvestmentSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateInvestment {
        onUpdateInvestment {
          __typename
          id
          type
          date
          value
        }
      }`
    )
  ) as Observable<OnUpdateInvestmentSubscription>;

  OnDeleteInvestmentListener: Observable<
    OnDeleteInvestmentSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteInvestment {
        onDeleteInvestment {
          __typename
          id
          type
          date
          value
        }
      }`
    )
  ) as Observable<OnDeleteInvestmentSubscription>;
}
