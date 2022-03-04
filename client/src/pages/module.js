import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Layout, QueryResult } from "../components";
import ModuleDetail from "../components/module-detail";

/** GET_TRACK gql query to retrieve a specific track by its ID */
export const GET_MODULE_AND_PARENT_TRACK = gql`
  query ModulePage($moduleId: ID!, $trackId: ID!) {
    module(id: $moduleId) {
      id
      title
      length
      content
      videoUrl
    }
    track(id: $trackId) {
      id
      title
      modules {
        id
        title
        length
      }
    }
  }
`;

const Module = ({ trackId, moduleId }) => {
  const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
    variables: { trackId, moduleId },
  });

  return (
    <Layout fullWidth>
      <QueryResult error={error} loading={loading} data={data}>
        <ModuleDetail module={data?.module} track={data?.track} />
      </QueryResult>
    </Layout>
  );
};

export default Module;
