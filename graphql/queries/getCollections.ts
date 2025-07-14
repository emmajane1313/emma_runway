import { emancipaClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const COLLECTIONS = gql`
  query ($skip: Int!) {
    drops(first: 10, skip: $skip) {
      uri
      collections {
        uri
        collectionId
        edition
        metadata {
          title
          cover
          video
          description
          config
        }
        acceptedTokens
        prices
      }
      metadata {
        cover
        title
      }
    }
  }
`;

export const getCollections = async (
  skip: number
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = emancipaClient.query({
    query: COLLECTIONS,
    variables: {
      skip,
    },
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  });

  const timeoutPromise = new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve({ timedOut: true });
    }, 60000);
  });

  const result: any = await Promise.race([queryPromise, timeoutPromise]);

  timeoutId && clearTimeout(timeoutId);

  if (result.timedOut) {
    return;
  } else {
    return result;
  }
};
