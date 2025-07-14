import { emancipaClient } from "@/app/lib/graph/client";
import { FetchResult, gql } from "@apollo/client";

const COLLECTION = gql`
  query ($title: String!) {
    collectionCreateds(
      where: { metadata_: { title_contains_nocase: $title } }
    ) {
      uri
      collectionId
      edition
      tokensSold
      metadata {
        title
        cover
        video
        description
        config
      }
      dropMetadata
      acceptedTokens
      prices
    }
  }
`;

export const getCollection = async (
  title: string
): Promise<FetchResult | void> => {
  let timeoutId: NodeJS.Timeout | undefined;
  const queryPromise = emancipaClient.query({
    query: COLLECTION,
    variables: {
      title,
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
